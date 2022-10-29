import express from "express";
import {
    addBookingController,
    addReviewController,
    getBookingsController,
    getBookingController,
    updateProfileController
} from "../controllers/user-controller.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {isCustomerMiddleware} from "../middlewares/is-customer-middleware.js";

export const UserRoute = express.Router();

UserRoute.post("/add-review", [authMiddleware, isCustomerMiddleware], addReviewController);
UserRoute.post("/add-booking", [authMiddleware, isCustomerMiddleware], addBookingController);
UserRoute.get("/get-booking/:bookingId", [authMiddleware, isCustomerMiddleware], getBookingController);
UserRoute.get("/get-bookings/:type/:usrId", [authMiddleware, isCustomerMiddleware], getBookingsController);
UserRoute.put("/update-profile/:usrId", [authMiddleware, isCustomerMiddleware], updateProfileController);
