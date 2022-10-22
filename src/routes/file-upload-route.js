import express from "express";
import multer from "multer";
import {
    getFileController,
    multipleFileUploadController,
    singleFileUploadController
} from "../controllers/file-upload-controller.js";

export const FileUploadRoute = express.Router();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage: fileStorage});

FileUploadRoute.get("/uploads/images/:key", getFileController);
FileUploadRoute.post("/upload/single", upload.single("file"), singleFileUploadController);
FileUploadRoute.post("/upload/multiple", upload.array("file", 20), multipleFileUploadController);