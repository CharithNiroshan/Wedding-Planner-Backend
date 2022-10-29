import {
    checkForUsernameService,
    forgetPasswordService,
    registerService, resetPasswordService,
    signInService
} from "../services/auth-service.js";

export const checkForUsernameController = async (req, res, next) => {
    try {
        res.status(200).json(await checkForUsernameService(req));
    } catch (err) {
        next(err);
    }
}

export const registerController = async (req, res, next) => {
    try {
        res.status(200).json(await registerService(req));
    } catch (err) {
        next(err)
    }
}

export const signInController = async (req, res, next) => {
    try {
        res.status(200).json(await signInService(req));
    } catch (err) {
        next(err)
    }
}

export const getPasswordResetTokenController = async (req, res, next) => {
    try {
        res.status(200).json(await forgetPasswordService(req));
    } catch (err) {
        next(err);
    }
}

export const resetPasswordController = async (req, res, next) => {
    try {
        res.status(200).json(await resetPasswordService(req));
    } catch (err) {
        next(err);
    }
}