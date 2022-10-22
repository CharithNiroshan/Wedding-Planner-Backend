import {
    addPackageService,
    deletePackageService, getPackagesService,
    updatePackageService,
    updateVendorProfileService
} from "../services/vendor-service.js";

export const updateVendorProfileController = async (req, res) => {
    try {
        res.status(200).json(await updateVendorProfileService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const addPackageController = async (req, res) => {
    try {
        res.status(200).json(await addPackageService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const updatePackageController = async (req, res) => {
    try {
        res.status(200).json(await updatePackageService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const deletePackageController = async (req, res) => {
    try {
        res.status(200).json(await deletePackageService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getPackagesController = async (req, res) => {
    try {
        res.status(200).json(await getPackagesService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}