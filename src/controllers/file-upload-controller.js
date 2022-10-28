import {getFileService, multipleFileUploadService, singleFileUploadService} from "../services/file-upload-service.js";

export const singleFileUploadController = async (req, res) => {
    try {
        res.status(200).json(await singleFileUploadService(req.file));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const multipleFileUploadController = async (req, res) => {
    try {
        res.status(200).json(await multipleFileUploadService(req.files));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getFileController = async (req, res) => {
    try {
        const fileStream = getFileService(req);
        fileStream.pipe(res);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}