import {addCategoryService, addDistrictService} from "../services/admin-service.js";

export const addCategoryController = async (req, res) => {
    try {
        res.status(200).json(await addCategoryService(req));
    } catch (err) {
        res.status(404).json({err: err.message});
    }
}

export const addDistrictController = async (req, res) => {
    try {
        res.status(200).json(await addDistrictService(req));
    } catch (err) {
        res.status(404).json({err: err.message});
    }
}