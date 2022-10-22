import {readFile, uploadFile, uploadFiles} from "../utils/s3.js";
import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

export const singleFileUploadService = async (file) => {
    try {
        const res = await uploadFile(file);
        await unlinkFile(file.path);

        return {
            success: true,
            message: "File has been uploaded successfully",
            imgUrl: `http://localhost:4000/api/file/uploads/images/${res.Key}`,
        }
    } catch (err) {
        return {
            success: false,
            data: {
                message: "File upload Failed",
                imgUrl: null,
            }
        }
    }
}

export const multipleFileUploadService = async (files) => {
    try {
        let res = await uploadFiles(files);

        console.log("sdasd");

        return {
            success: true,
            data: {
                message: "File has been uploaded successfully",
                imageUrlArray: res,
            }
        }
    } catch (err) {
        return {
            success: false,
            data: {
                message: "File upload Failed",
                imgUrl: null,
            }
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

