import mongoose from "mongoose";

export const PackageSchema = new mongoose.Schema({
    venId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
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
    includes:{
        type:[mongoose.SchemaTypes.String],
        required:true,
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    }
});
