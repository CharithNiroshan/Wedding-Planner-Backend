export const isAdminMiddleware = (req, res, next) => {
    const {userType} = req;
    if (userType !== 2) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. You need to be login as a admin to access the resource"
        })
    }
    next();
}