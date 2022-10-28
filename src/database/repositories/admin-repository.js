import {AdminModel} from "../models/admin-model.js";

let result;

export const createAdmin = async (admin) => {
    result = await AdminModel.create(admin);
    return result;
}

export const getAdmin = async (id) => {
    result = await AdminModel.findById(id);
    return result;
}