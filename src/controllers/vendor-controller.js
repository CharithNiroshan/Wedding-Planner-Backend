import {
    addPackageService,
    approveBookingRequestService,
    deletePackageService,
    getAppointmentService,
    getAppointmentsService,
    getBookingRequestService,
    getBookingRequestsService,
    getPackagesService, getVendorHomeDetailsService,
    rejectBookingRequestService,
    updatePackageService,
    updateVendorProfileService
} from "../services/vendor-service.js";

export const getVendorHomeDetailsController = async (req,res,next)=>{
    try{
        res.status(200).json(await getVendorHomeDetailsService(req))
    }catch (err){
        next(err);
    }
}

export const updateVendorProfileController = async (req, res, next) => {
    try {
        res.status(200).json(await updateVendorProfileService(req));
    } catch (err) {
        next(err);
    }
}

export const addPackageController = async (req, res, next) => {
    try {
        res.status(200).json(await addPackageService(req));
    } catch (err) {
        next(err);
    }
}

export const updatePackageController = async (req, res, next) => {
    try {
        res.status(200).json(await updatePackageService(req));
    } catch (err) {
        next(err);
    }
}

export const deletePackageController = async (req, res, next) => {
    try {
        res.status(200).json(await deletePackageService(req));
    } catch (err) {
        next(err);
    }
}

export const getPackagesController = async (req, res, next) => {
    try {
        res.status(200).json(await getPackagesService(req));
    } catch (err) {
        next(err);
    }
}

export const getBookingRequestsController = async (req, res, next) => {
    try {
        res.status(200).json(await getBookingRequestsService(req));
    } catch (err) {
        next(err);
    }
}

export const getBookingRequestController = async (req, res, next) => {
    try {
        res.status(200).json(await getBookingRequestService(req));
    } catch (err) {
        next(err);
    }
}

export const getAppointmentsController = async (req, res, next) => {
    try {
        res.status(200).json(await getAppointmentsService(req));
    } catch (err) {
        next(err);
    }
}

export const getAppointmentController = async (req, res, next) => {
    try {
        res.status(200).json(await getAppointmentService(req));
    } catch (err) {
        next(err);
    }
}

export const approveBookingRequestController = async (req, res, next) => {
    try {
        res.status(200).json(await approveBookingRequestService(req));
    } catch (err) {
        next(err);
    }
}

export const rejectBookingRequestController = async (req, res, next) => {
    try {
        res.status(200).json(await rejectBookingRequestService(req));
    } catch (err) {
        next(err);
    }
}