import mongoose from "mongoose";

export const BookingSchema=new mongoose.Schema({
    usrId: {
        type:mongoose.SchemaTypes.String,
        required:true
    },
    venId: {
        type:mongoose.SchemaTypes.String,
        required:true
    },
    type: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    packageId: {
        type: mongoose.SchemaTypes.String
    },
    services: [String],
    extraInfo: {
        type: mongoose.SchemaTypes.String
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        required: true
    },
    bookedOn: {
        type: mongoose.SchemaTypes.Date,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    message: {
        type: mongoose.SchemaTypes.String,
    },
});