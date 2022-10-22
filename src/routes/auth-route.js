import express from "express";
import {
    checkForUsernameController,
    registerController,
    getPasswordResetTokenController,
    signInController, resetPasswordController
} from "../controllers/auth-controller.js";

export const AuthRoute = express.Router();

AuthRoute.post("/username-check", checkForUsernameController);
AuthRoute.post("/sign-in", signInController);
AuthRoute.post("/register", registerController);
AuthRoute.post("/forget-password", getPasswordResetTokenController);
AuthRoute.put("/reset-password/:resetToken", resetPasswordController);