import {
    getCategoriesService,
    getDistrictsService,
    getHomeDetailsService,
    getVendorProfileService,
    searchVendorProfilesService
} from "../services/guest-service.js";

export const getHomeDetailsController = async (req, res, next) => {
    try {
        res.status(200).json(await getHomeDetailsService());
    } catch (err) {
        next(err);
    }
}

export const getVendorProfileController = async (req, res, next) => {
    try {
        res.status(200).json(await getVendorProfileService(req));
    } catch (err) {
        next(err);
    }
}

export const searchVendorProfilesController = async (req, res, next) => {
    try {
        res.status(200).json(await searchVendorProfilesService(req));
    } catch (err) {
        next(err);
    }
}

export const getCategoriesController = async (req, res, next) => {
    try {
        res.status(200).json(await getCategoriesService());
    } catch (err) {
        next(err);
    }
}

export const getDistrictsController = async (req, res, next) => {
    try {
        res.status(200).json(await getDistrictsService());
    } catch (err) {
        next(err);
    }
}