import express from "express";
import {
    addPackageController,
    approveBookingRequestController,
    deletePackageController,
    getAppointmentController,
    getAppointmentsController,
    getBookingRequestController,
    getBookingRequestsController,
    getPackagesController, getVendorHomeDetailsController,
    rejectBookingRequestController,
    updatePackageController,
    updateVendorProfileController
} from "../controllers/vendor-controller.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {isVendorMiddleware} from "../middlewares/is-vendor-middleware.js";

export const VendorRoute = express.Router();

VendorRoute.get("/:venId", [authMiddleware, isVendorMiddleware], getVendorHomeDetailsController);
VendorRoute.put("/update-profile/:venId", [authMiddleware, isVendorMiddleware], updateVendorProfileController)
VendorRoute.post("/add-package", [authMiddleware, isVendorMiddleware], addPackageController);
VendorRoute.put("/edit-package/:id", [authMiddleware, isVendorMiddleware], updatePackageController);
VendorRoute.delete("/delete-package/:id", [authMiddleware, isVendorMiddleware], deletePackageController);
VendorRoute.get("/get-packages/:venId", [authMiddleware, isVendorMiddleware], getPackagesController);
VendorRoute.get("/get-booking-requests/:venId", [authMiddleware, isVendorMiddleware], getBookingRequestsController);
VendorRoute.get("/get-booking-request/:bookingRequestId", [authMiddleware, isVendorMiddleware], getBookingRequestController);
VendorRoute.get("/get-appointments/:venId", [authMiddleware, isVendorMiddleware], getAppointmentsController);
VendorRoute.get("/get-appointment/:appointmentId", [authMiddleware, isVendorMiddleware], getAppointmentController);
VendorRoute.get("/get-appointment/:appointmentId", [authMiddleware, isVendorMiddleware], getAppointmentController);
VendorRoute.put("/approve-booking-request/:bookingRequestId", [authMiddleware, isVendorMiddleware], approveBookingRequestController);
VendorRoute.put("/reject-booking-request/:bookingRequestId", [authMiddleware, isVendorMiddleware], rejectBookingRequestController);