import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
    fullName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    disName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    prfImgUrl: {
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
});
