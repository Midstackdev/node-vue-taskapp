import jwt from 'jsonwebtoken'

export function generateJWT(user) {
    const tokenData = { username: user.username, id: user._id}
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET)
}

export function requireLogin(req, res, next) {
    const token = decodeToken(req)
    if(!token) {
        return res.status(401).json({ errors: {message: 'Unauthorized'}})
    }
    next()
}

export function decodeToken(req) {
    const token = req.headers.authorization.split(' ')[1] || req.headers['authorization'].split(' ')[1]

    if(!token) {
        return null
    }

    try {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(error) {
        return null
    }
}

export function getUsername(req) {
    const token = decodeToken(req)

    if(!token) {
        return null
    }
    return token.user.username
}

export function getUserId(req) {
    const token = decodeToken(req)

    if(!token) {
        return null
    }
    return token.user.id
}