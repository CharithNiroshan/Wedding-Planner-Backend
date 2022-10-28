import {
    addPackageService, approveBookingRequestService,
    deletePackageService, getAppointmentService,
    getAppointmentsService,
    getBookingRequestService,
    getBookingRequestsService,
    getPackagesService, rejectBookingRequestService,
    updatePackageService,
    updateVendorProfileService
} from "../services/vendor-service.js";

export const updateVendorProfileController = async (req, res) => {
    try {
        res.status(200).json(await updateVendorProfileService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const addPackageController = async (req, res) => {
    try {
        res.status(200).json(await addPackageService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const updatePackageController = async (req, res) => {
    try {
        res.status(200).json(await updatePackageService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const deletePackageController = async (req, res) => {
    try {
        res.status(200).json(await deletePackageService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getPackagesController = async (req, res) => {
    try {
        res.status(200).json(await getPackagesService(req));
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getBookingRequestsController = async (req, res) => {
    try {
        res.status(200).json(await getBookingRequestsService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export const getBookingRequestController = async (req, res) => {
    try {
        res.status(200).json(await getBookingRequestService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export const getAppointmentsController = async (req, res) => {
    try {
        res.status(200).json(await getAppointmentsService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export const getAppointmentController = async (req, res) => {
    try {
        res.status(200).json(await getAppointmentService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export const approveBookingRequestController = async (req, res) => {
    try {
        res.status(200).json(await approveBookingRequestService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

export const rejectBookingRequestController = async (req, res) => {
    try {
        res.status(200).json(await rejectBookingRequestService(req));
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}