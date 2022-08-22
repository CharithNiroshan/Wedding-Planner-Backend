import mongoose from "mongoose";

export const AuthSchema= new mongoose.Schema({
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    pwd:{
        type:mongoose.SchemaTypes.String,
        required: true,
    },
    type:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    },
    usrId:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    resetPasswordToken: {
        type:mongoose.SchemaTypes.String,
    },
    resetPasswordTokenExpire: {
        type:mongoose.SchemaTypes.Date,
    },
});