export const isVendorMiddleware = (req, res, next) => {
    const {userType} = req;
    if (userType !== 1) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. You need to be login as a vendor to access the resource"
        })
    }
    next();
}