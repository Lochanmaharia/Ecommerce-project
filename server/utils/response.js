



// success response
const sendSuccess = (res, message = "Success", data = {}, meta = {}) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        meta

    });
};

// sendOk
const sendOk = (res, message = "Success") => {
    return res.status(200).json({
        success: true,
        message
    });
};

// created response
const sendCreated = (res, message = "Created successfully") => {
    return res.status(201).json({
        success: true,
        message
    });
};



// bad request (validation error)
const sendBadRequest = (res, message = "Bad Request") => {
    return res.status(400).json({
        success: false,
        message
    });
};

// not found
const sendNotFound = (res, message = "Resource not found") => {
    return res.status(404).json({
        success: false,
        message
    });
};


// conflict (already exist)
const sendConflict = (res, message = "Data already exists") => {
    return res.status(409).json({
        success: false,
        message
    });
};

// server error
const sendServerError = (res, error) => {
    console.error(error); // log internally
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};


//send response for opt verification
// const otpVerificationResponse = (res, message = "OTP verified successfully", success = true) => {
//     return res.status(200).json({
//         success,
//         message
//     });
// }

module.exports = {
    sendSuccess,
    sendServerError,
    sendConflict,
    sendNotFound,
    sendBadRequest,
    sendCreated,
    sendOk
};