import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDatabase} from "./database/dbConnection.js";
import {AuthRoute} from "./routes/auth-route.js";
import {GuestRoute} from "./routes/guest-route.js";
import {UserRoute} from "./routes/user-route.js";
import {VendorRoute} from "./routes/vendor-route.js";
import {FileUploadRoute} from "./routes/file-upload-route.js";
import {AdminRoute} from "./routes/admin-route.js";
import {errorHandler} from "./middlewares/error-handler-middleware.js";

dotenv.config({path: "config.env"});
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use('/api/auth', AuthRoute);
app.use('/api/guest', GuestRoute);
app.use('/api/user', UserRoute);
app.use('/api/vendor', VendorRoute);
app.use('/api/file', FileUploadRoute);
app.use('/api/admin', AdminRoute);
app.use(errorHandler);

connectDatabase(() => app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}));


