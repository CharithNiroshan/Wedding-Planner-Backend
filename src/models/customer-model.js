import mongoose from "mongoose";
import {CustomerSchema} from "../schemas/customer-schema.js";

export const CustomerModel = mongoose.model("customer",CustomerSchema);