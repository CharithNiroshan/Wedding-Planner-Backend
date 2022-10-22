import {PackageModel} from "../models/package-model.js";

let result;

export const createPackage = async (pack) => {
    result = await PackageModel.create(pack);
    return result;
}

export const updatePackage = async (id, updates) => {
    result = await PackageModel.findOneAndUpdate(
        {
            _id: id,
        },
        updates,
        {new: true, rawResult: true}
    );
    return result;
}

export const deletePackage = async (id) => {
    result = await PackageModel.findByIdAndDelete(id);
    return result;
}

export const getPackages = async (venId) => {
    result = await PackageModel.find({venId: venId});
    return result;
}