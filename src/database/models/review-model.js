import mongoose from "mongoose";
import {ReviewSchema} from "../schemas/review-schema.js";

export const ReviewModel = mongoose.model("review", ReviewSchema);