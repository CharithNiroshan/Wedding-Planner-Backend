import {createPackage, deletePackage, getPackages, updatePackage} from "../database/repositories/package-repository.js";
import {updateVendor} from "../database/repositories/vendor-repository.js";
import {
    getBookingRequest,
    getBookingRequests, getAppointmentsForPeriod,
    updateBookingRequest, getCount
} from "../database/repositories/booking-repository.js";

export const getVendorHomeDetailsService = async (req) => {
    const {venId} = req.params;

    const todayStartTime = new Date();
    todayStartTime.setHours(0, 0, 0, 0);
    const todayEndTime = new Date();
    todayEndTime.setHours(23, 59, 59, 9999);

    const weeklyStart = new Date();
    weeklyStart.setHours(0,0,0,0);
    const weeklyEnd = new Date();
    weeklyEnd.setDate(weeklyStart.getDate() + 7)
    weeklyEnd.setHours(23,59,59,9999);

    const todayAppointments = await getAppointmentsForPeriod(venId, todayStartTime, todayEndTime);
    const weeklyAppointments = await getAppointmentsForPeriod(venId, weeklyStart, weeklyEnd);
    const appointmentCount = await getCount(venId, 1);
    const bookingRequestCount = await getCount(venId, 0);

    return {
        success: true,
        data: {
            stats: {
                appointmentCount: appointmentCount,
                bookingRequestCount: bookingRequestCount
            },
            todayAppointments: todayAppointments,
            weeklyAppointments: weeklyAppointments
        }
    }
}

export const updateVendorProfileService = async (req) => {
    const {venId} = req.params;
    const updates = req.body;

    const result = await updateVendor(venId, updates);

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

export const addPackageService = async (req) => {
    const {packTitle, packDes, packImgUrl, packPrice, packServices, venId} = req.body;

    const pack = {
        title: packTitle,
        des: packDes,
        imgUrl: packImgUrl,
        price: packPrice,
        includes: packServices,
        venId: venId,
    }

    const result = await createPackage(pack);

    if (result) {
        return ({
            success: true,
            data: {
                message: "Package Added Successfully",
                package: result
            }
        })
    }
}

export const updatePackageService = async (req) => {
    const {id} = req.params;
    const updates = req.body;

    const result = await updatePackage(id, updates);

    if (result.lastErrorObject.updatedExisting) {
        return ({
            success: true,
            data: {
                message: "Package Updated Successfully",
                package: result
            }
        })
    }
}

export const deletePackageService = async (req) => {
    const {id} = req.params;

    const result = await deletePackage(id);

    if (result) {
        return ({
            success: true,
            data: {
                message: "Package Deleted Successfully"
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Package could not be found."
        }
    }
}

export const getPackagesService = async (req) => {
    const {venId} = req.params;

    const packages = await getPackages(venId);

    return ({
        success: true,
        data: {
            packages: packages
        }
    })
}

export const getBookingRequestsService = async (req) => {
    const {venId} = req.params;

    let bookingRequests = await getBookingRequests(venId, 0);

    return ({
        success: true,
        data: {
            bookingRequests: bookingRequests
        }
    })
}

export const getBookingRequestService = async (req) => {
    const {bookingRequestId} = req.params;

    let bookingRequest = await getBookingRequest(bookingRequestId);

    if (bookingRequest) {
        return ({
            success: true,
            data: {
                bookingRequest: bookingRequest
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Booking request could not be found."
        }
    }
}

export const getAppointmentsService = async (req) => {
    const {venId} = req.params;

    let appointments = await getBookingRequests(venId, 1);

    return ({
        success: true,
        data: {
            appointments: appointments
        }
    })
}

export const getAppointmentService = async (req) => {
    const {appointmentId} = req.params;

    let appointment = await getBookingRequest(appointmentId);

    if (appointment) {
        return ({
            success: true,
            data: {
                appointment: appointment
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Appointment could not be found."
        }
    }

}

export const approveBookingRequestService = async (req) => {
    const {bookingRequestId} = req.params;

    const updates = {
        status: 1
    }

    const result = await updateBookingRequest(bookingRequestId, updates);

    if (result.lastErrorObject.updatedExisting) {
        return ({
            success: true,
            data: {
                message: "Approved Booking Request Successfully."
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Approving Failed. Please try again."
        }
    }
}

export const rejectBookingRequestService = async (req) => {
    const {bookingRequestId} = req.params;
    const {message} = req.body;

    if (message === undefined) {
        throw {
            statuscode: 400,
            message: "Reject message is required."
        }
    }

    const updates = {
        status: 2,
        message: message
    }

    const result = await updateBookingRequest(bookingRequestId, updates);

    if (result.lastErrorObject.updatedExisting) {
        return ({
            success: true,
            data: {
                message: "Booking Request Rejected Successfully."
            }
        })
    } else {
        throw {
            statuscode: 404,
            message: "Approving Failed. Try Again."
        }
    }
}