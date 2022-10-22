import express from "express";
import {connectDatabase} from "./connection/dbConnection.js";
import {AuthRoute} from "./routes/auth-route.js";
import {GuestRoute} from "./routes/guest-route.js";
import {UserRoute} from "./routes/user-route.js";
import {VendorRoute} from "./routes/vendor-route.js";
import cors from "cors";
import {FileUploadRoute} from "./routes/file-upload-route.js";
import {AdminRoute} from "./routes/admin-route.js";

const app = express();

const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use('/api/auth', AuthRoute);
app.use('/api/guest', GuestRoute);
app.use('/api/user', UserRoute);
app.use('/api/vendor', VendorRoute);
app.use('/api/file', FileUploadRoute);
app.use('/api/admin', AdminRoute);
app.use(express.static("public"));

connectDatabase(() => app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}));


