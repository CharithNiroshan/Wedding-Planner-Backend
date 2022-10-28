import mongoose from "mongoose";

const MONGO_USERNAME="rio";
const MONGO_PWD="98039803";
const MONGO_CLUSTER="weddingplannercluster"
const MONGO_DB_NAME="weddingPlanner"
const dbURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PWD}@${MONGO_CLUSTER}.xi3zcl7.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

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