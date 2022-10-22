import {
    checkForUsernameService,
    forgetPasswordService,
    registerService, resetPasswordService,
    signInService
} from "../services/auth-service.js";

export const checkForUsernameController = async (req, res) => {
    try {
        res.status(200).json(await checkForUsernameService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const registerController = async (req, res) => {
    try {
        res.status(200).json(await registerService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const signInController = async (req, res) => {
    try {
        res.status(200).json(await signInService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getPasswordResetTokenController = async (req, res) => {
    try {
        res.status(200).json(await forgetPasswordService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        res.status(200).json(await resetPasswordService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}