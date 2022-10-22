import express from "express";
import {
    getCategoriesController,
    getDistrictsController,
    getHomeDetailsController,
    getVendorProfileController,
    searchVendorProfilesController,
} from "../controllers/guest-controller.js";

export const GuestRoute=express.Router();

GuestRoute.get("/",getHomeDetailsController);
GuestRoute.get('/get-categories',getCategoriesController);
GuestRoute.get('/get-districts',getDistrictsController);
GuestRoute.post("/business-profile/search",searchVendorProfilesController);
GuestRoute.get("/business-profile/:id",getVendorProfileController);



