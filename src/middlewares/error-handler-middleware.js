export const errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;

    if (err.code === 11000) {
        error = {
            statuscode: 400,
            message: "Duplicate Field Value Entered.",
        }
    }

    if (err.name === "ValidationError") {
        error = {
            statuscode: 400,
            message: "Validation Error"
        }
    }


    res.status(error.statuscode || 500).json({
        success: false,
        error: error.message || "Internal Server Error",
    });
};