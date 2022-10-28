import mongoose from "mongoose";
import {VendorSchema} from "../schemas/vendor-schema.js";

export const VendorModel = mongoose.model("vendor", VendorSchema);