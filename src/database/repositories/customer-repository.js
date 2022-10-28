import {CustomerModel} from "../models/customer-model.js";

let result;

export const createCustomer = async (customer) => {
    result = await CustomerModel.create(customer);
    return result;
}

export const getCustomer = async (id) => {
    result = await CustomerModel.findById(id);
    return result;
}

export const updateCustomer = async (id, updates) => {
    result = await CustomerModel.findOneAndUpdate(
        {
            _id: id,
        },
        updates,
        {new: true, rawResult: true}
    );
    return result;
}