import {createPackage, deletePackage, getPackages, updatePackage} from "../database/repositories/package-repository.js";
import {updateVendor} from "../database/repositories/vendor-repository.js";
import {getBookingRequest, getBookingRequests, updateBookingRequest} from "../database/repositories/booking-repository.js";

export const updateVendorProfileService = async (req) => {
    const {venId} = req.params;
    const updates = req.body;

    const result = await updateVendor(venId, updates);

    return {
        success: true,
        data: {
            message: "Profile Updated Successfully.",
            user: result?.value,
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

    return ({
        success: true,
        data: {
            message: "Package Added Successfully",
            package: result
        }
    })
}

export const updatePackageService = async (req) => {
    const {id} = req.params;
    const updates = req.body;

    const result = await updatePackage(id, updates);

    return ({
        success: true,
        data: {
            message: "Package Updated Successfully",
            package: result
        }
    })
}

export const deletePackageService = async (req) => {
    const {id} = req.params;

    await deletePackage(id);

    return ({
        success: true,
        data: {
            message: "Package Deleted Successfully"
        }
    })
}

export const getPackagesService = async (req) => {
    const {venId} = req.params;

    const packages = await getPackages(venId);

    console.log(venId);

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

    return ({
        success: true,
        data: {
            bookingRequest: bookingRequest
        }
    })
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

    let appointments = await getBookingRequest(appointmentId);

    return ({
        success: true,
        data: {
            appointments: appointments
        }
    })
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
        return ({
            success: true,
            data: {
                message: "Approving Failed. Try Again."
            }
        })
    }


}

export const rejectBookingRequestService = async (req) => {
    const {bookingRequestId} = req.params;
    const {message} = req.body;

    if(message === undefined){
        return ({
            success: false,
            data: {
                message: "Reject message is required."
            }
        })
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
        return ({
            success: true,
            data: {
                message: "Approving Failed. Try Again."
            }
        })
    }


}