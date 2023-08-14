const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secrect = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1m'
        }

        JWT.sign(payload, secrect, options, (err, token) => {
            if(err) reject(err);
            
            resolve(token)
        })
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secrect = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y'
        }

        JWT.sign(payload, secrect, options, (err, token) => {
            if(err) reject(err);
            
            resolve(token)
        })
    })
}

const verifyAccessToken = async (req, res, next) => {
    if(!req.headers['authorization']) {
        return next(createError.Unauthorized)
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    //start verify token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            if(err.name === 'JsonWebTokenError') {
                next(createError.Unauthorized())
            }

            return next(createError.Unauthorized(err.message))
            
        }

        req.payload = payload;
        next();
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        try {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) {
                   reject(err) 
                }
        
                resolve(payload);
            })
        } catch(error) {
            reject(error)
        }
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}