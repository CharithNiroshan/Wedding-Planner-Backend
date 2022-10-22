import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    usrId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    venId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    des: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
});