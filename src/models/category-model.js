import mongoose from "mongoose";
import {CategorySchema} from "../schemas/category-schema.js";

export const CategoryModel = mongoose.model("category", CategorySchema);