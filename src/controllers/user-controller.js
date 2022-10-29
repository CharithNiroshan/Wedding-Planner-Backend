import {
    addBookingService,
    addReviewService,
    getBookingService,
    getBookingsService,
    updateUserProfileService
} from "../services/user-service.js";

export const addReviewController = async (req, res, next) => {
    try {
        res.status(200).json(await addReviewService(req));
    } catch (err) {
        next(err);
    }
}

export const addBookingController = async (req, res, next) => {
    try {
        res.status(200).json(await addBookingService(req));
    } catch (err) {
        next(err);
    }
}

export const getBookingController = async (req, res, next) => {
    try {
        res.status(200).json(await getBookingService(req));
    } catch (err) {
        next(err);
    }
}

export const getBookingsController = async (req, res, next) => {
    try {
        res.status(200).json(await getBookingsService(req));
    } catch (err) {
        next(err);
    }
}

export const updateProfileController = async (req, res, next) => {
    try {
        res.status(200).json(await updateUserProfileService(req));
    } catch (err) {
        next(err);
    }
}
