import mongoose from "mongoose";
import {DistrictSchema} from "../schemas/district-schema.js";

export const DistrictModel = mongoose.model("district", DistrictSchema);