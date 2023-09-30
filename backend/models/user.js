const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter your name'],
        trim: true,
        minlength: [3,'2 characters minimum'],
        maxlength: [20,'20 characters maximum']
    },
    email: {
        type: String,
        required: [true,'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please enter your password'],
        trim: true,
        minlength: [6,'6 characters minimum'],
        maxlength: [20,'20 characters maximum'],
        select: false
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//Password encryption prior to save
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password=await bcrypt.hash(this.password, 10)
})

//Compare user password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Return token
userSchema.methods.getJsonWebToken = function () {
    return jsonwebtoken.sign({
        id: this.id 
    
    }, process.env.JSONWEBTOKEN_SECRET, {
        expiresIn: process.env.JSONWEBTOKEN_EXPIRE
    })
}

//Token for password reset
userSchema.methods.resetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User',userSchema)