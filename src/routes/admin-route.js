import express from "express";
import {addCategoryController, addDistrictController} from "../controllers/admin-controller.js";

export const AdminRoute = express.Router();

AdminRoute.post("/add-category", addCategoryController);
AdminRoute.post("/add-district", addDistrictController);