import mongoose from "mongoose";
import {CustomerModel} from "../models/customer-model.js";
import {VendorModel} from "../models/vendor-model.js";
import {PackageModel} from "../models/package-model.js";

export const BookingSchema = new mongoose.Schema({
    usrId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        ref: CustomerModel
    },
    venId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        ref:VendorModel
    },
    type: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    packageId: {
        type: mongoose.SchemaTypes.String,
        ref:PackageModel
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