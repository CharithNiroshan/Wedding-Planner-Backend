import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {getAuthById} from "../database/repositories/auth-repository.js";

dotenv.config({path: "config.env"});

export const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Sorry. You don't have access to the requested resource."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const auth = await getAuthById(decoded.id);

        if (!auth) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token."
            })
        } else {
            req.userType = auth.type;
            next();
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}