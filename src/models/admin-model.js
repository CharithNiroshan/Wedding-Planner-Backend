import mongoose from "mongoose";
import {AdminSchema} from "../schemas/admin-schema.js";

export const AdminModel=mongoose.model("admin",AdminSchema);