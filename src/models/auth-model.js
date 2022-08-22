import mongoose from "mongoose";
import {AuthSchema} from "../schemas/auth-schema.js";

export const AuthModel=mongoose.model("auth",AuthSchema);