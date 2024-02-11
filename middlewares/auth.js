import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(StatusCodes.UNAUTHORIZED).json({message: "Provide a valid authorization header"})
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: decoded.userId}
        next()
    } catch (error) {
        next(error)
    }
}