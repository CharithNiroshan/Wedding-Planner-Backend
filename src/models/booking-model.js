import mongoose from "mongoose";
import {BookingSchema} from "../schemas/booking-schema.js";

export const BookingModel = mongoose.model("booking", BookingSchema);