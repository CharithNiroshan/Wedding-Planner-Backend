import {createCategory} from "../database/repositories/category-repository.js";
import {createDistrict} from "../database/repositories/district-repository.js";

export const addCategoryService = async (req) => {
    const {title, imgUrl, services} = req.body;

    const category = {
        title,
        imgUrl,
        services
    }

    const result = await createCategory(category);

    return ({
        success: true,
        data: {
            message: "Category added successfully",
            result: result
        }
    })
}

export const addDistrictService = async (req) => {
    const {title, imgUrl} = req.body;

    const district = {
        title,
        imgUrl
    }

    const result = await createDistrict(district);

    return ({
        success: true,
        data: {
            message: "District added successfully",
            result: result
        }
    })
}