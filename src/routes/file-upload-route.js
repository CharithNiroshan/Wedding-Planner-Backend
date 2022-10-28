import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import {
    getFileController,
    multipleFileUploadController,
    singleFileUploadController
} from "../controllers/file-upload-controller.js";
import {s3} from "../utils/s3.js";
import dotenv from "dotenv";
dotenv.config({path:"config.env"});

export const FileUploadRoute = express.Router();

const bucketName = process.env.AWS_BUCKET_NAME;

const fileStorage = multerS3({
    s3:s3,
    bucket:bucketName,
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req,file,cb){
        cb(null, Date.now()+"-"+ file.originalname);
    },
});

const upload = multer({storage: fileStorage});

FileUploadRoute.get("/uploads/images/:key", getFileController);
FileUploadRoute.post("/upload/single", upload.single("file"), singleFileUploadController);
FileUploadRoute.post("/upload/multiple", upload.array("file", 20), multipleFileUploadController);