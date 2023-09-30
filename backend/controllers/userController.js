const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


// Register a user   => /api/v1/register
exports.register = catchAsyncErrors(async (req, res, next) => {


    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    })

    sendToken(user, 200, res)

})

//Login => /api/v1/login

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    //email + password entered?
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400))
    }

    //find in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    //password correct?
    const isMatch = await user.isCorrectPassword(password)

    if (!isMatch) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }


    sendToken(user, 200, res)

})

//Logout => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie ('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status: 'success',
        message: 'Logged out'
    })
})

// Recover password => /api/v1/password/recover
exports.recoverPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email})

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    const resetToken = user.resetPassword()

    await user.save({ validateBeforeSave: false })

    //Send reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Password reset token: \n \n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: "Gentleman's Accessory Password Reset Token",
            message
        })
        res.status(200).json({
            success: true,
            message: 'Check your email for the reset link'
        })
        
    } catch (error) {
        user.resetPasswordToken=undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Invalid or expired token', 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400))
    }

    //Update password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    
    sendToken(user, 200, res)
 })

 //Details of logged in user => /api/v1/me
 exports.getMe = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Change password => api/v1/password/change
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const matching = await user.isCorrectPassword(req.body.oldPassword)

    if (!matching) {
        return next(new ErrorHandler('Invalid old password', 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})

//Update personal profile => /api/v1/me/update

exports.updateMe = catchAsyncErrors(async (req, res, next) => {
    const updatedUser = {
        name: req.body.name,
        email: req.body.email
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, updatedUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })

})

//Admin route

//Get all users => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req,res,next) =>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })

})

//Get user details => /api/v1/admin/user/:id

exports.getUserDetails = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})


//Update personal profile => /api/v1/admin/user/:id

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })

})

//Delete user => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    await user.remove()

    res.status(200).json({
        success: true
    })
})