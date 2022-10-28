import {AuthModel} from "../models/auth-model.js";

let result;

export const checkIfUsernameExists = async (username) => {
    result = await AuthModel.findOne({usrName: username});
    return result;
}

export const createAuth = async (auth) => {
    result = await AuthModel.create(auth);
    return result;
}

export const getAuth = async (usrName) => {
    result = await AuthModel.findOne({usrName: usrName});
    return result;
}

export const updateAuth = async (updates, id) => {
    result = await AuthModel.findByIdAndUpdate(
        id,
        updates,
        {new: true, rawResult: true}
    )
    return result;
}

export const getAuthByResetPasswordToken = async (resetPasswordToken) =>{
    result = await AuthModel.findOne({
        resetPasswordToken:resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
    });
    return result;
}