import {BookingModel} from "../models/booking-model.js";

let result;

export const createBooking = async (booking) => {
    result = await BookingModel.create(booking);
    return result;
}

export const getBookings = async (usrId, types) => {
    result = await BookingModel.aggregate([
        {
            $match: {
                usrId: usrId,
                status: {$in: types},
                date: {
                    $gt: new Date()
                }
            }
        },
        {
            $addFields: {
                venId: {
                    $toObjectId: "$venId"
                },
                packageId: {
                    $toObjectId: "$packageId"
                }
            }
        },
        {
            $lookup: {
                from: "vendors",
                localField: "venId",
                foreignField: "_id",
                as: "vendor",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "package",
            }
        },
        {
            $set: {
                vendor: {$arrayElemAt: ["$vendor", 0]},
                package: {$arrayElemAt: ["$package", 0]},
            }
        },
        {
            $sort: {
                date: 1
            }
        },
        {
            $project: {
                usrId: 0,
                venId: 0,
                packageId: 0
            }
        }
    ])
    return result;
}

export const getBooking = async (bookingId) => {
    result = await BookingModel.aggregate([
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $match: {
                _id: bookingId
            }
        },
        {
            $addFields: {
                venId: {
                    $toObjectId: "$venId"
                },
                packageId: {
                    $toObjectId: "$packageId"
                }
            }
        },
        {
            $lookup: {
                from: "vendors",
                localField: "venId",
                foreignField: "_id",
                as: "vendor",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "package",
            }
        },
        {
            $set: {
                vendor: {$arrayElemAt: ["$vendor", 0]},
                package: {$arrayElemAt: ["$package", 0]},
            }
        },
        {
            $project: {
                usrId: 0,
                venId: 0,
                packageId: 0
            }
        }
    ])
    return result[0];
}

export const getBookingRequests = async (venId, status) => {
    result = await BookingModel.aggregate([
        {
            $match: {
                venId: venId,
                status: status,
                date: {
                    $gt: new Date()
                }
            }
        },
        {
            $addFields: {
                usrId: {
                    $toObjectId: "$usrId"
                },
                packageId: {
                    $toObjectId: "$packageId"
                }
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "usrId",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "package",
            }
        },
        {
            $set: {
                user: {$arrayElemAt: ["$user", 0]},
                package: {$arrayElemAt: ["$package", 0]},
            }
        },
        {
            $sort: {
                date: 1
            }
        },
        {
            $project: {
                usrId: 0,
                venId: 0,
                packageId: 0
            }
        }
    ])
    return result;
}

export const getBookingRequest = async (bookingRequestId) => {
    result = await BookingModel.aggregate([
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $match: {
                _id: bookingRequestId
            }
        },
        {
            $addFields: {
                usrId: {
                    $toObjectId: "$usrId"
                },
                packageId: {
                    $toObjectId: "$packageId"
                }
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "usrId",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "package",
            }
        },
        {
            $set: {
                user: {$arrayElemAt: ["$user", 0]},
                package: {$arrayElemAt: ["$package", 0]},
            }
        },
        {
            $project: {
                usrId: 0,
                venId: 0,
                packageId: 0
            }
        }
    ])
    return result[0];
}

export const updateBookingRequest = async (bookingRequestId, updates) => {
    result = BookingModel.findOneAndUpdate(
        {
            _id: bookingRequestId
        },
        updates,
        {
            new: true, rawResult: true
        }
    )
    return result;
}

export const getAppointmentsForPeriod = async (venId, start, end) => {
    result = await BookingModel.aggregate([
        {
            $match: {
                venId: venId,
                status: 1,
                date: {
                    $gt: start,
                    $lt: end
                }
            }
        },
        {
            $addFields: {
                usrId: {
                    $toObjectId: "$usrId"
                },
                packageId: {
                    $toObjectId: "$packageId"
                }
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "usrId",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "packageId",
                foreignField: "_id",
                as: "package",
            }
        },
        {
            $set: {
                user: {$arrayElemAt: ["$user", 0]},
                package: {$arrayElemAt: ["$package", 0]},
            }
        },
        {
            $sort: {
                date: 1
            }
        },
        {
            $project: {
                usrId: 0,
                venId: 0,
                packageId: 0
            }
        }
    ])
    return result;
}

export const getCount = async (venId, status) => {
    result = await BookingModel.count({
        venId: venId,
        status: status,
        date: {
            $gt: new Date()
        }
    });
    return result;
}