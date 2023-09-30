const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
const jsonwebtoken = require('jsonwebtoken')

//user authenticated?
exports.isAuthenticated = catchAsyncErrors( async (req, res, next) => {
    const {token} = req.cookies

    if(!token) {
        return next(new ErrorHandler('Authentication is required', 401))
    }

    const decoded = jsonwebtoken.verify(token, process.env.JSONWEBTOKEN_SECRET)
    req.user = await User.findById(decoded.id)

    next()
})

//User role
exports.authRoles = (...roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You are not authorized to perform this action', 403))
        }
        next()
    }
}