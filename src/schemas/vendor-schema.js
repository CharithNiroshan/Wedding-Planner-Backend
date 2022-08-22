import mongoose from "mongoose";

export const VendorSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    des: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    logoUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    coverPhotoUrl: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    cntNo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    district: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    services: [mongoose.SchemaTypes.String]
});