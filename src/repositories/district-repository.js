import {DistrictModel} from "../models/district-model.js";

let result;

export const createDistrict = async (district) => {
    result = await DistrictModel.create(district);

    return result;
}

export const getDistricts = async () => {
    result = await DistrictModel.find();

    return result
}

export const getTopDistrictsWithProfileCount = async () => {
    result = await DistrictModel.aggregate([
        {

            $lookup: {
                from: "vendors",
                localField: "title",
                foreignField: "district",
                as: "vendors",
            }
        },
        {
            $addFields: {
                noOfProfiles: {
                    $size: "$vendors"
                },
            }
        },
        {
            $project: {
                vendors: 0,
            }
        },
        {
            $sort: {
                noOfProfiles: -1,
            }
        },
        {
            $limit: 8
        }
    ])

    return result;
}