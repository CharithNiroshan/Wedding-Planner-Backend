import mongoose from "mongoose";

export const PackageSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    des: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imgUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    price: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    venId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});
