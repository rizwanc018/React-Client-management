import jwt from 'jsonwebtoken'

const generateJwtToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

const generateAdminJwtToken = (res ,adminId) => {
    const token = jwt.sign({ adminId, admin: true }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

export { generateJwtToken, generateAdminJwtToken }