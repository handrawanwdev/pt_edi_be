module.exports = {
    ok: (values, res, message = "Request was successfully processed and returned") => {
        let status_code = 200;
        return res.status(status_code).send({ code:"200", message, result: values})
    },
    created: (values, res, message = "Request was successfully processed and returned") => {
        let status_code = 201;
        return res.status(status_code).send({ code:"201", message, result: values})
    },
    bad: (values, res, message = "Missing or invalid parameter(s)") => {
        let status_code = 400;
        return res.status(status_code).send({ code:"400", message, result: values})
    },
    unauthorized: (values, res, message = "Unauthorized") => {
        let status_code = 401;
        return res.status(status_code).send({ code:"401", message, result: values})
    },
    accessDenied: (values, res, message = "Access Forbidden") => {
        let status_code = 403;
        return res.status(status_code).send({ code:"403", message, result: values})
    },
    notFoundRecord: (values, res, message = "Ops... Not Found") => {
        let status_code = 404;
        return res.status(status_code).send({ code:"404", message, result: values})
    },
    notFound: (values, res, message = "Ops... Not Found") => {
        let status_code = 404;
        return res.status(status_code).send({ code:"404", message, result: values})
    },
    timeout: (values, res, message = "Ops... Request Timeout") => {
        let status_code = 408;
        return res.status(status_code).send({ code:"408", message, result: values})
    },
    duplicated: (values, res, message = "Ops... Duplicated data") => {
        let status_code = 409;
        return res.status(status_code).send({ code:"409", message, result: values})
    },
    entityLarge: (values, res, message = "Request Entity Too Large") => {
        let status_code = 413;
        return res.status(status_code).send({ code:"413", message, result: values})
    },
    error: (values, res, message = "Ops... Internal server error, please contact support") => {
        let status_code = 500;
        return res.status(status_code).send({ code:"500", message, result: values})
    },
    errorCognito: (values, res, message = "Ops... Internal server error, please contact support") => {
        let status_code = 422;
        return res.status(status_code).send({ code:"422", message, result: values})
    }
}