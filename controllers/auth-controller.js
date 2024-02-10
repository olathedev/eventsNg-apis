import User from "../models/auth-model.js";
import { validate } from "../validators/user-validator.js";
import{ BadRequest, UnAuthorised } from "../errors/index.js"
import { StatusCodes } from "http-status-codes";

// 
// 
// 

export const signup = async (req, res, next) => {

    console.log(req.body)

    try {
        const {error} = validate(req.body)

        if(error) {
            throw new BadRequest(error)
        }

        const user = await User.create(req.body)
        const token = User.generateToken(user._id)

        res.status(StatusCodes.OK).json({
            fullname: user.fullname,
            email: user.email, 
            token
        })
    } catch (error) {
       next(error)
    }
}

// 
// 
// 

export const signin = async (req, res, next) => {

    const {body: {email, password}} = req
    
    try {
        if(!email || !password) {
            throw new BadRequest("Email and password are required")
        }

        const user = await User.findOne({email})

        if(!user) {
            throw new UnAuthorised("Email not registered")
        }

        const matchPassword = await User.comparePassword(password, user.password)

        if(!matchPassword) {
            throw new UnAuthorised("Incorrect password")
        }

        const token = User.generateToken(user._id)

        res.status(StatusCodes.OK).json({
            fullname: user.fullname,
            email: user.email, 
            token
        })

    } catch (error) {
        next(error)
    }

}

