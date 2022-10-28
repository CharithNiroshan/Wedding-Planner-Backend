import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    services: [mongoose.SchemaTypes.String],
});
