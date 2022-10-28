import {VendorModel} from "../models/vendor-model.js";

let result;

export const createVendor = async (vendor) => {
    result = await VendorModel.create(vendor);

    return result;
}

export const getVendor = async (id) => {
    result = await VendorModel.aggregate([
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $match: {
                _id: id,
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "venId",
                pipeline: [
                    {
                        $addFields: {
                            usrId: {
                                $toObjectId: "$usrId"
                            },
                        }
                    },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "usrId",
                            foreignField: "_id",
                            as: "user"
                        },
                    },
                    {
                        $set: {
                            user: {$arrayElemAt: ["$user", 0]}
                        }
                    },
                    {
                        $project: {
                            des: 1,
                            rating: 1,
                            date: 1,
                            "user.disName": 1,
                            "user.prfImgUrl": 1,
                        }
                    },
                ],
                as: "reviews",
            }
        },
        {
            $lookup: {
                from: "packages",
                localField: "_id",
                foreignField: "venId",
                pipeline: [
                    {
                        $project: {
                            venId: 0
                        },
                    }
                ],
                as: "packages",
            }
        },
        {
            $addFields: {
                noOfReviews: {
                    $size: "$reviews"
                },
                rating: {
                    $avg: "$reviews.rating"
                }
            }
        },
    ]);

    return result[0];
}

export const getVendorProfile = async (id) => {
    result = VendorModel.findOne({_id: id});
    return result;
}

export const searchVendors = async (query, districts, categories, sortByRating, sortByNoOfReviews) => {
    let sort = [];

    if (sortByRating && sortByNoOfReviews) {
        sort = [{
            $sort: {
                noOfReviews: -1,
                rating: -1,
            }
        }]
    } else if (sortByRating && !sortByNoOfReviews) {
        sort = [{
            $sort: {
                rating: -1,
            }
        }]
    } else if (!sortByRating && sortByNoOfReviews) {
        sort = [{
            $sort: {
                noOfReviews: -1,
            }
        }]
    }


    result = await VendorModel.aggregate([
        {
            $match: {
                title: {
                    $regex: new RegExp(`${query}`), $options: 'i'
                },
                category: {
                    $in: categories,
                },
                district: {
                    $in: districts,
                }
            },
        },
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "venId",
                as: "reviews",
            }
        },
        {
            $addFields: {
                noOfReviews: {
                    $size: "$reviews"
                },
                rating: {
                    $avg: "$reviews.rating"
                }
            }
        },
        ...sort,
        {
            $project: {
                title: 1,
                logoUrl: 1,
                coverPhotoUrl: 1,
                category: 1,
                noOfReviews: 1,
                rating: 1
            }
        }
    ])

    return result;
}

export const getTopRatedVendors = async () => {
    result = await VendorModel.aggregate([
        {
            $addFields: {
                _id: {
                    $toString: "$_id"
                },
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "venId",
                as: "reviews",
            }
        },
        {
            $addFields: {
                noOfReviews: {
                    $size: "$reviews"
                },
                rating: {
                    $avg: "$reviews.rating"
                }
            }
        },
        {
            $project: {
                title: 1,
                logoUrl: 1,
                coverPhotoUrl: 1,
                category: 1,
                noOfReviews: 1,
                rating: 1
            }
        },
        {
            $sort: {
                rating: -1
            }
        },
        {
            $limit: 8
        }
    ])

    return result;
}

export const updateVendor = async (id, updates) => {
    result = await VendorModel.findOneAndUpdate(
        {
            _id: id,
        },
        updates,
        {new: true, rawResult: true}
    );
    return result;
}