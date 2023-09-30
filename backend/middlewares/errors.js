const ErrorHandler = require('../utils/errorHandler')


module.exports = (err, req, res, next) => {
    err.statusCode=err.statusCode || 500

    if(process.env.NODE_ENV.trim()==='DEVELOPMENT')
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        })
    

    if(process.env.NODE_ENV.trim()==='PRODUCTION')
    {
        let error={...err}
        error.message=err.message

        //Wrong mongoose object id error
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //Handling mongoose validation error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

        //Handling mongoose duplicate key error
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} value entered`
            error = new ErrorHandler(message, 400)
        }

        //Handling wrong JsonWebToken error
        if(err.name === 'JsonWebTokenError') {
            const message = `JSON Web Token is invalid`
            error = new ErrorHandler(message, 400)
        }

        //Handling expired JsonWebToken error
        if(err.name === 'TokenExpiredError') {
            const message = `JSON Web Token expired`
            error = new ErrorHandler(message, 400)
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}