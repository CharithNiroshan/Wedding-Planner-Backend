import {getTopRatedVendors, getVendor, searchVendors} from "../repositories/vendor-repository.js";
import {getCategories, getTopCategoriesWitProfilesCount} from "../repositories/category-repository.js";
import {getDistricts, getTopDistrictsWithProfileCount} from "../repositories/district-repository.js";

export const getHomeDetailsService = async () => {
    const businessProfiles = await getTopRatedVendors();
    const categories = await getTopCategoriesWitProfilesCount();
    const districts = await getTopDistrictsWithProfileCount();

    return ({
        success: true,
        data: {
            businessProfiles: businessProfiles,
            categories: categories,
            districts: districts
        }
    })
}

export const getVendorProfileService = async (req) => {
    const id = req.params.id;
    const vendorProfile = await getVendor(id);

    return ({
        success: true,
        data: vendorProfile,
    })
}

export const searchVendorProfilesService = async (req) => {
    let {query, districts, categories, sortByRating, sortByNoOfReviews} = req.body;

    const allCategories = await getCategories();
    const allDistricts = await getDistricts();

    if (categories.length === 0) {
        categories = allCategories.map(item => item.title);
    }

    if (districts.length === 0) {
        districts = allDistricts.map(item => item.title);
    }

    const vendorProfiles = await searchVendors(
        query,
        districts,
        categories,
        sortByRating,
        sortByNoOfReviews
    );

    return ({
        success: true,
        data: vendorProfiles,
    })
}

export const getCategoriesService = async () => {
    const categories = await getCategories();

    return ({
        success: true,
        data: {
            categories: categories
        }
    })
}

export const getDistrictsService = async () => {
    const districts = await getDistricts();

    return ({
        success: true,
        data: {
            districts: districts
        }
    })
}