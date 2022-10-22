import {
    getCategoriesService,
    getDistrictsService,
    getHomeDetailsService,
    getVendorProfileService,
    searchVendorProfilesService
} from "../services/guest-service.js";

export const getHomeDetailsController = async (req, res) => {
    try {
        res.status(200).json(await getHomeDetailsService());
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getVendorProfileController = async (req, res) => {
    try {
        res.status(200).json(await getVendorProfileService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const searchVendorProfilesController = async (req, res) => {
    try {
        res.status(200).json(await searchVendorProfilesService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getCategoriesController = async (req,res)=>{
    try {
        res.status(200).json(await getCategoriesService());
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getDistrictsController = async (req,res)=>{
    try {
        res.status(200).json(await getDistrictsService());
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}