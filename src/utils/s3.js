import S3 from "aws-sdk/clients/s3.js";
import dotenv from "dotenv";
dotenv.config({path:"config.env"});

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

export const readFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}

