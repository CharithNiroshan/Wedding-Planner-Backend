import {createPackage, deletePackage, getPackages, updatePackage} from "../repositories/package-repository.js";
import {updateVendor} from "../repositories/vendor-repository.js";

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

    return ({
        success: true,
        data: {
            packages: packages
        }
    })
}

