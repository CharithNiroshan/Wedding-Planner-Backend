import express from "express";
import {
    addPackageController,
    deletePackageController,
    getPackagesController,
    updatePackageController,
    updateVendorProfileController
} from "../controllers/vendor-controller.js";

export const VendorRoute = express.Router();

VendorRoute.put("/update-profile/:venId", updateVendorProfileController)
VendorRoute.post("/add-package", addPackageController);
VendorRoute.put("/edit-package/:id", updatePackageController);
VendorRoute.delete("/delete-package/:id", deletePackageController);
VendorRoute.get("/get-packages/:venId", getPackagesController);