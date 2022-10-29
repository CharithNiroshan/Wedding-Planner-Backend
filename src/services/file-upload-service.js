import {readFile} from "../utils/s3.js";

export const singleFileUploadService = async (req) => {
    if (req !== undefined) {
        return ({
            success: true,
            message: "File uploaded successfully",
            imgUrl: `https://my-wedding-planner-lk.herokuapp.com/api/file/uploads/images/${req.key}`
        })
    } else {
        throw {
            statuscode:404,
            message:"File Uploading Failed."
        }
    }
}

export const multipleFileUploadService = async (req) => {
    if (req !== undefined) {
        const fileArray = req.map(item => `https://my-wedding-planner-lk.herokuapp.com/api/file/uploads/images/${item.key}`)
        return ({
            success: true,
            message: "Files uploaded successfully",
            imgUrlArray: fileArray
        })
    } else {
        throw {
            statuscode:404,
            message:"Files Uploading Failed."
        }
    }
}

export const getFileService = (req) => {
    const {key} = req.params;

    try {
        return readFile(key);
    } catch (err) {
        throw err;
    }
}

