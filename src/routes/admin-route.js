import express from "express";
import {addCategoryController, addDistrictController} from "../controllers/admin-controller.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {isAdminMiddleware} from "../middlewares/is-admin-middleware.js";

export const AdminRoute = express.Router();

AdminRoute.post("/add-category", [authMiddleware, isAdminMiddleware], addCategoryController);
AdminRoute.post("/add-district", [authMiddleware, isAdminMiddleware], addDistrictController);