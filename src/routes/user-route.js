import express from "express";
import {
    addBookingController,
    addReviewController,
    getBookingsController,
    getBookingController,
    updateProfileController
} from "../controllers/user-controller.js";

export const UserRoute=express.Router();

UserRoute.post("/add-review",addReviewController);
UserRoute.post("/add-booking",addBookingController);
UserRoute.get("/get-booking/:bookingId",getBookingController);
UserRoute.get("/get-bookings/:type/:usrId",getBookingsController);
UserRoute.put("/update-profile/:usrId",updateProfileController);
