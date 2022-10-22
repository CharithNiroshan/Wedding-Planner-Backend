import {config} from "../config.js";
import S3 from "aws-sdk/clients/s3.js";

const bucketName = config.AWS_BUCKET_NAME;
const region = config.AWS_BUCKET_REGION;
const accessKeyId = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

export const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

// export const uploadFile = (file) => {
//     const fileStream = fs.createReadStream(file.path);
//
//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.filename
//     }
//
//     return s3.upload(uploadParams).promise();
// }
//
// export const uploadFiles = (files) => {
//     const promises = [];
//
//     files.map(async (file) => {
//         promises.push(await uploadFile(file));
//     })
//
//     return promises;
// }

export const readFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}

