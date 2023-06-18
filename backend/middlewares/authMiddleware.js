import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import userModel from "../models/userModel.js"

const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, Invalid token');
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { verifyUser }