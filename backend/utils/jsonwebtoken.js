//Create + send token + save in cookie
const sendToken =(user, statusCode, res) => {

    //Create token
    const token = user.getJsonWebToken();

    //Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.JSONWEBTOKEN_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
}

module.exports = sendToken