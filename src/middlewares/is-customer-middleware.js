export const isCustomerMiddleware = (req, res, next) => {
    const {userType} = req;
    if (userType !== 0) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. You need to be login as a customer to access the resource"
        })
    }
    next();
}