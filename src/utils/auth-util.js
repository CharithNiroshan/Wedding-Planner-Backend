import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const getSignedToken = (id, type) => {
    return jwt.sign({id: id, type: type}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRES_IN});
}

export const matchPasswords = async (password, password2) => {
    return await bcrypt.compare(password, password2);
}

export const getHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const getPasswordResetToken = async () => {
    const resetToken = crypto.randomBytes(20).toString("hex");

    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const resetPasswordTokenExpiresIn = Date.now() + 10 * (60 * 1000);

    return {
        resetToken: resetToken,
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiresIn: resetPasswordTokenExpiresIn
    };
}