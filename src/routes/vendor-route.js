import express from "express";
import {
    addPackageController,
    approveBookingRequestController,
    deletePackageController,
    getAppointmentController,
    getAppointmentsController,
    getBookingRequestController,
    getBookingRequestsController,
    getPackagesController,
    rejectBookingRequestController,
    updatePackageController,
    updateVendorProfileController
} from "../controllers/vendor-controller.js";

export const VendorRoute = express.Router();

VendorRoute.put("/update-profile/:venId", updateVendorProfileController)
VendorRoute.post("/add-package", addPackageController);
VendorRoute.put("/edit-package/:id", updatePackageController);
VendorRoute.delete("/delete-package/:id", deletePackageController);
VendorRoute.get("/get-packages/:venId", getPackagesController);
VendorRoute.get("/get-booking-requests/:venId", getBookingRequestsController);
VendorRoute.get("/get-booking-request/:bookingRequestId", getBookingRequestController);
VendorRoute.get("/get-appointments/:venId", getAppointmentsController);
VendorRoute.get("/get-appointment/:appointmentId", getAppointmentController);
VendorRoute.get("/get-appointment/:appointmentId", getAppointmentController);
VendorRoute.put("/approve-booking-request/:bookingRequestId", approveBookingRequestController);
VendorRoute.put("/reject-booking-request/:bookingRequestId", rejectBookingRequestController);