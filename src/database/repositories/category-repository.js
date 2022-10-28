import {CategoryModel} from "../models/category-model.js";

let result;

export const createCategory = async (category) => {
    result = await CategoryModel.create(category);
    return result;
}

export const getCategories = async () => {
    result = await CategoryModel.find();
    return result;
}

export const getTopCategoriesWitProfilesCount = async () => {
    result = await CategoryModel.aggregate([
        {

            $lookup: {
                from: "vendors",
                localField: "title",
                foreignField: "category",
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
                services: 0,
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