import {getFileService, multipleFileUploadService, singleFileUploadService} from "../services/file-upload-service.js";

export const singleFileUploadController = async (req, res, next) => {
    try {
        res.status(200).json(await singleFileUploadService(req.file));
    } catch (err) {
        next(err)
    }
}

export const multipleFileUploadController = async (req, res, next) => {
    try {
        res.status(200).json(await multipleFileUploadService(req.files));
    } catch (err) {
        next(err);
    }
}

export const getFileController = async (req, res, next) => {
    try {
        const fileStream = getFileService(req);
        fileStream.pipe(res);
    } catch (err) {
        next(err);
    }
}