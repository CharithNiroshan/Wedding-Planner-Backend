import mongoose from "mongoose";
import {PackageSchema} from "../schemas/package-schema.js";

export const PackageModel = mongoose.model("package", PackageSchema);