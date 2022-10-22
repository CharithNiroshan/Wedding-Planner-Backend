import mongoose from "mongoose";
import {config} from "../config.js";

const dbURL = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PWD}@${config.MONGO_CLUSTER}.xi3zcl7.mongodb.net/${config.MONGO_DB_NAME}?retryWrites=true&w=majority`;

export const connectDatabase = (callbackFunc) => {
    mongoose.connect(dbURL);

    mongoose.connection.on("open", () => {
        console.log("Connected to Database Successfully.");
        callbackFunc();
    });

    mongoose.connection.on("error", err => {
        console.log(`Unable to connect to Database.\n${err}`)
    });
}