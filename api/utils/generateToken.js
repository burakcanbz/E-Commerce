const jwt = require('jsonwebtoken');

exports.generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //Set JWT as HTTP-Only cookie;
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_END !== 'development',
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    })
}