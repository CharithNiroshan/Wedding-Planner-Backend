import {addCategoryService, addDistrictService} from "../services/admin-service.js";

export const addCategoryController = async (req, res, next) => {
    try {
        res.status(200).json(await addCategoryService(req));
    } catch (err) {
        next(err);
    }
}

export const addDistrictController = async (req, res, next) => {
    try {
        res.status(200).json(await addDistrictService(req));
    } catch (err) {
        next(err)
    }
}