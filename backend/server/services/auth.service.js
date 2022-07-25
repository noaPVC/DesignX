const jwt = require('jsonwebtoken')
require('dotenv').config()

const token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_secret = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
    loginResponseBuilder: function (user) {
        const generatedAccessToken = issueToken(user._id, user.email)
        const generatedRefreshToken = issueRefreshToken(user._id, user.email)

        return {
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                bio: user.bio,
                avatarProfileSource: user.avatarProfileSource,
                joined: user.joined
            },
            accessToken: generatedAccessToken,
            refreshToken: generatedRefreshToken
        }
    },
    // middleware passed between every request
    authenticateToken: function (req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token || token === undefined)
            return res.status(401).json({ error: true, message: 'Unauthorized! Bearer missing.' })

        jwt.verify(token, token_secret, (err, user) => {
            if (err)
                return res.status(403).json({ error: true, message: 'Unauthorized! Access invalid/expired.' })

            req.user = user
            next()
        })
    },
    verifyRefreshToken: function (req, res, next) {
        const refreshToken = req.body.refreshToken

        if (!refreshToken || refreshToken === undefined)
            return res.status(400).json({ error: true, message: 'No token provided!' })

        jwt.verify(refreshToken, refresh_secret, (err, user) => {
            if (err)
                return res.status(403).json({ error: true, message: 'Unauthorized! token invalid.' })

            const generatedAccessToken = issueToken(user._id, user.sub)
            const generatedRefreshToken = issueRefreshToken(user._id, user.sub)

            req.tokenObject = {
                accessToken: generatedAccessToken,
                refreshToken: generatedRefreshToken
            }

            next()
        })
    }
}

function issueToken(userId, identity) {
    const options = {
        issuer: 'DesignX corp',
        subject: identity,
        audience: 'http://designx.com',
        expiresIn: '15min'
    }

    return jwt.sign({
        _id: userId
    }, token_secret, options)
}

function issueRefreshToken(userId, identity) {
    return jwt.sign({
        _id: userId
    }, refresh_secret, {
        subject: identity
    })
}