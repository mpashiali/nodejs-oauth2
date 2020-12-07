const errors = {
    errors: [
        {
            code: "ERR_CANNOT_APPROVE",
            message: "Cannot approve a payment that has already been canceled"
        },
        {
            code: "ERR_CANNOT_CANCEL",
            message: "Cannot cancel a payment that has already been approved"
        },
        {
            code: "ERR_UNAUTHORIZED",
            message: "No auth toke provided"
        },
        {
            code: "ERR_AUTH_TOKEN_EXPIRED",
            message: "Auth token expired"
        },
        {
            code: "ERR_VALIDATION",
            message: "Validation failed",
            details: [
                {
                    message: "amount field is required",
                    path: [
                        "amount"
                    ],
                    value: null
                }
            ]
        },
        {
            code: "INTERNAL_SERVER_ERR",
            message: "Service is currently unavailble, please try again later."
        }
    ]
}

export function getMessage(code) {
    var error = errors.errors.filter(function (message) {
        return message.code === code;
    });
    return error;
}
