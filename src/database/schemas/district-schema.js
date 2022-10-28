import mongoose from "mongoose";

export const DistrictSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});