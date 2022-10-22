import {AdminModel} from "../models/admin-model.js";

export const createAdmin = async (admin) => {
    const result = await AdminModel.create(admin);
    return result;
}

export const getAdmin = async (id) => {
    const result = await AdminModel.findById(id);
    return result;
}