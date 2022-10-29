import {checkForEligibilityToReview, createReview} from "../database/repositories/review-repository.js";
import {createBooking, getBooking, getBookings} from "../database/repositories/booking-repository.js";
import {updateCustomer} from "../database/repositories/customer-repository.js";

export const addReviewService = async (req) => {
    const {usrId, venId, rating, ratingDes} = req.body;

    const isAlreadyAddedReview = await checkForEligibilityToReview(usrId, venId);

    if (isAlreadyAddedReview.length === 0) {
        const date = Date.now();

        const review = {
            usrId: usrId,
            venId: venId,
            rating: rating,
            des: ratingDes,
            date: date
        }

        const result = await createReview(review);

        if (result) {
            return {
                success: true,
                data: {
                    message: "Review Added Successfully"
                }
            }
        }
    } else {
        throw {
            statuscode: 400,
            message: "Sorry. You can't add more than one review with the same vendor.",
        }
    }
}

export const addBookingService = async (req) => {
    const {usrId, venId, bookingType, bookingPackage, bookingServices, extReq, bookingDate} = req.body;

    let type;

    switch (bookingType) {
        case "0":
            type = 0;
            break;
        case "1":
            type = 1
            break;
        default:
            break;
    }

    const booking = {
        usrId: usrId,
        venId: venId,
        type: type,
        packageId: bookingPackage,
        services: bookingServices,
        extraInfo: extReq,
        date: bookingDate,
        status: 0,
        bookedOn: Date.now(),
        message: null
    }

    const result = await createBooking(booking);

    if (result) {
        return {
            success: true,
            data: {
                message: "Booking added Successfully.",
            }
        }
    }
}

export const getBookingService = async (req) => {
    const {bookingId} = req.params;

    const result = await getBooking(bookingId);

    if (result) {
        return ({
            success: true,
            data: {
                booking: result,
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Booking not Found"
        }
    }


}

export const getBookingsService = async (req) => {
    const {type, usrId} = req.params;

    let types;

    switch (type) {
        case "Accepted":
            types = [1];
            break;
        case "Pending":
            types = [0];
            break;
        case "Rejected":
            types = [2];
            break;
        default:
            types = [0, 1, 2];
            break;
    }

    const result = await getBookings(usrId, types);

    return {
        success: true,
        data: {
            bookings: result,
        }
    }
}

export const updateUserProfileService = async (req) => {
    const {usrId} = req.params;
    const updates = req.body;

    const result = await updateCustomer(usrId, updates);

    if (result.lastErrorObject.updatedExisting) {
        return {
            success: true,
            data: {
                message: "Profile Updated Successfully.",
                user: result?.value,
            }
        }
    }
}

