import {
    checkIfUsernameExists,
    createAuth,
    getAuth,
    getAuthByResetPasswordToken,
    updateAuth
} from "../repositories/auth-repository.js";
import {createAdmin, getAdmin} from "../repositories/admin-repository.js";
import {createCustomer, getCustomer} from "../repositories/customer-repository.js";
import {createVendor, getVendorProfile} from "../repositories/vendor-repository.js";
import {getHashedPassword, getPasswordResetToken, getSignedToken, matchPasswords} from "../utils/auth-util.js";
import crypto from "crypto";
import {sentMail} from "../utils/sent-mail.js";

export const checkForUsernameService = async (req) => {
    const {usrName} = req.body;

    if (!usrName) {
        return {success: false, message: "Username is required"}
    }

    const auth = await checkIfUsernameExists(usrName);

    if (auth) {
        return {isExists: true};
    } else {
        return {isExists: false};
    }
}

export const registerService = async (req) => {
    const {auth, user} = req.body;

    let createdUser, createdAuth;


    switch (auth.type) {
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
            break;
    }

    const hashedPassword = await getHashedPassword(auth.pwd);

    createdAuth = await createAuth({...auth, pwd: hashedPassword, usrId: createdUser._id});

    const token = getSignedToken(createdAuth._id, auth.type);

    return {token: token, type: createdAuth.type, user: createdUser};
}

export const signInService = async (req) => {
    const {usrName, pwd} = req.body;

    const auth = await getAuth(usrName);

    if (!auth) {
        return {
            success: false,
            data: {
                message: "Username could not be Found",
            }
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
                user = await getVendorProfile(auth.usrId);
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
        return {
            success: false,
            data: {
                message: "Invalid Password",
            }
        }
    }
}

export const forgetPasswordService = async (req) => {
    const {usrName} = req.body;

    const auth = await getAuth(usrName);

    if (!auth) {
        return {
            success: false,
            data: {
                message: "Username could not be found."
            }
        }
    }

    const {resetToken, resetPasswordToken, resetPasswordTokenExpiresIn} = await getPasswordResetToken();

    const updates = {
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpire: resetPasswordTokenExpiresIn
    }

    const result = await updateAuth(updates, auth._id);

    const customer = await getCustomer(auth.usrId);

    if (result.ok) {
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

        try {
            await sentMail(mailOptions);

            return {
                success: true,
                data: {
                    message: `Mail has been sent successfully to ${customer.email}. Check your inbox.`,
                }
            }
        } catch (err) {
            return {
                success: false,
                data: {
                    message: `Something went wrong with sending the mail. ${err.message}`,
                }
            }
        }
    } else {
        return {
            success: false,
            data: {
                message: "Something went wrong. Please try again."
            }
        }
    }
}

export const resetPasswordService = async (req) => {
    const {pwd} = req.body;
    const {resetToken} = req.params;

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const auth = await getAuthByResetPasswordToken(resetPasswordToken);

    if (!auth) {
        return {
            success: false,
            data: {
                message: "Password reset token is not valid",
            }
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
    } else {
        return {
            success: false,
            data: {
                message: "Could not update the password. Please try again."
            }
        }
    }
}