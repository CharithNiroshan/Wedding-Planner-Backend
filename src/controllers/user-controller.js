import {
    addBookingService,
    addReviewService,
    getBookingService,
    getBookingsService,
    updateUserProfileService
} from "../services/user-service.js";

export const addReviewController = async (req, res) => {
    try {
        res.status(200).json(await addReviewService(req));
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const addBookingController = async (req,res)=>{
    try{
        res.status(200).json(await addBookingService(req));
    }catch (err){
        res.status(404).json({error:err.message});
    }
}

export const getBookingController = async (req,res)=>{
    try{
        res.status(200).json(await getBookingService(req));
    }catch (err){
        res.status(404).json({error:err.message});
    }
}

export const getBookingsController = async (req,res)=>{
    try{
        res.status(200).json(await getBookingsService(req));
    }catch (err){
        res.status(404).json({error:err.message});
    }
}

export const updateProfileController = async (req,res)=>{
    try{
        res.status(200).json(await updateUserProfileService(req));
    }catch (err){
        res.status(404).json({error:err.message});
    }
}
