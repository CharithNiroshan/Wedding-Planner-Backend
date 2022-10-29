import {
    checkIfUsernameExists,
    createAuth,
    getAuth,
    getAuthByResetPasswordToken,
    updateAuth
} from "../database/repositories/auth-repository.js";
import {createAdmin, getAdmin} from "../database/repositories/admin-repository.js";
import {createCustomer, getCustomer} from "../database/repositories/customer-repository.js";
import {createVendor, getVendor} from "../database/repositories/vendor-repository.js";
import {getHashedPassword, getPasswordResetToken, getSignedToken, matchPasswords} from "../utils/auth-util.js";
import crypto from "crypto";
import {sentMail} from "../utils/sent-mail.js";

export const checkForUsernameService = async (req) => {
    const {usrName} = req.body;

    if (!usrName) {
        throw {
            statuscode: 400,
            message: "Username is required"
        };
    }

    const auth = await checkIfUsernameExists(usrName);

    if (auth) {
        return {
            success: true,
            data: {
                isExists: true
            }
        }
    } else {
        return {
            success: true,
            data: {
                isExists: false
            }
        }
    }
}

export const registerService = async (req) => {
    const {auth, user} = req.body;

    let createdUser, createdAuth;

    switch (auth?.type) {
        case '0':
            createdUser = await createCustomer(user);
            break;
        case '1':
            createdUser = await createVendor(user);
            break;
        case '2':
            createdUser = await createAdmin(user);
            break;
        default:
            throw {
                statuscode: 400,
                message: "User type not available"
            }
    }

    const hashedPassword = await getHashedPassword(auth.pwd);

    createdAuth = await createAuth({...auth, pwd: hashedPassword, usrId: createdUser._id});

    const token = getSignedToken(createdAuth._id, auth.type);

    return {token: token, type: createdAuth.type, user: createdUser};
}

export const signInService = async (req) => {
    const {usrName, pwd} = req.body;

    if (!usrName || !pwd) {
        throw {
            statuscode: 400,
            message: "Username and Password required"
        }
    }

    const auth = await getAuth(usrName);

    if (!auth) {
        throw {
            statuscode: 401,
            message: "Username could not be found."
        }
    }

    const isMatch = await matchPasswords(pwd, auth.pwd);

    if (isMatch) {
        const token = getSignedToken(auth._id, auth.type);
        let user;

        switch (auth.type) {
            case 0:
                user = await getCustomer(auth.usrId);
                break;
            case 1:
                user = await getVendor(auth.usrId);
                break;
            case 2:
                user = await getAdmin(auth.usrId);
                break;
            default:
                break;
        }

        return {
            success: true,
            data: {
                token: token,
                type: auth.type,
                user: user
            }
        }
    } else {
        throw {
            statuscode: 401,
            message: "Invalid password."
        }
    }
}

export const forgetPasswordService = async (req) => {
    const {usrName} = req.body;

    if (!usrName) {
        throw {
            statuscode: 400,
            message: "Username is required."
        }
    }

    const auth = await getAuth(usrName);

    if (!auth) {
        throw {
            statuscode: 401,
            message: "Invalid Username."
        }
    }

    const {resetToken, resetPasswordToken, resetPasswordTokenExpiresIn} = await getPasswordResetToken();

    const updates = {
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpire: resetPasswordTokenExpiresIn
    }

    const result = await updateAuth(updates, auth._id);

    let customer;

    switch (auth.type) {
        case 0:
            customer = await getCustomer(auth.usrId);
            break;
        case 1:
            customer = await getVendor(auth.usrId);
            break;
        case 2:
            customer = await getAdmin(auth.usrId);
            break;
        default:
            break
    }

    if (result.lastErrorObject.updatedExisting) {
        const resetPasswordUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

        const mailOptions = {
            to: customer.email,
            subject: "Password Reset Link",
            html: `
                <h1>You Have Requested to Reset Password</h1>
                <p>You can reset your password by visiting below Url</p>
                <a href=${resetPasswordUrl}>${resetPasswordUrl}</a>
            `
        }

        await sentMail(mailOptions);

        return {
            success: true,
            data: {
                message: `Mail has been sent successfully to ${customer.email}. Check your inbox.`,
            }
        }
    } else {
        throw {
            statuscode: 404,
            message: "Updating database failed."
        }
    }
}

export const resetPasswordService = async (req) => {
    const {pwd} = req.body;
    const {resetToken} = req.params;

    if(!pwd){
        throw {
            statuscode:400,
            message:"New password is required"
        }
    }

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const auth = await getAuthByResetPasswordToken(resetPasswordToken);

    if (!auth) {
        throw {
            statuscode:401,
            message:"Password reset token is not valid"
        }
    }

    const hashedPassword = await getHashedPassword(pwd);

    const updates = {
        pwd: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpire: null
    }

    const result = await updateAuth(updates, auth._id);

    if (result.lastErrorObject.updatedExisting) {
        return {
            success: true,
            data: {
                message: "Password has been reset successfully. Login to continue."
            }
        }
    }
}