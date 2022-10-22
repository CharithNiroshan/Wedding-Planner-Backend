import {BookingModel} from "../models/booking-model.js";

let result;

export const createBooking = async (booking) => {
    result = await BookingModel.create(booking);
    return result;
}

export const getBookings = async (usrId, types) => {
    result = await BookingModel.aggregate(
        [
            {
                $match: {
                    usrId: usrId,
                    status: {$in: types}
                }
            },
            {
                $addFields: {
                    usrId: {
                        $toObjectId: "$usrId"
                    },
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
                    from: "customers",
                    localField: "usrId",
                    foreignField: "_id",
                    as: "user",
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
                    user: {$arrayElemAt: ["$user", 0]},
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
        ]
    )
    return result;
}

export const getBooking = async (bookingId) => {
    result = await BookingModel.aggregate(
        [
            {
                $addFields: {
                    _id: {
                        $toString: "$_id"
                    },
                }
            },
            {
                $match: {
                    _id: bookingId,
                }
            },
            {
                $addFields: {
                    usrId: {
                        $toObjectId: "$usrId"
                    },
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
                    from: "customers",
                    localField: "usrId",
                    foreignField: "_id",
                    as: "user",
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
                    user: {$arrayElemAt: ["$user", 0]},
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
        ]
    )
    return result[0];
}