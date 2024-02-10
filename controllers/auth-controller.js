import User from "../models/auth-model.js";
import { validate } from "../validators/user-validator.js";
import { BadRequest, UnAuthorised } from "../errors/index.js"
import { StatusCodes } from "http-status-codes";

// 
// 
// 

export const signup = async (req, res, next) => {

    try {
        const { error } = validate(req.body)

        if (error) {
            throw new BadRequest(error)
        }

        const verificationToken = '12345abc'

        const user = await User.create({ ...req.body, verificationToken })


        res.status(StatusCodes.OK).json(
            {
                // user: {
                //     fullname: user.fullname,
                //     email: user.email,

                // }

                user
            })
    } catch (error) {
        next(error)
    }
}

// 
// 
// 


export const accountVerification = async (req, res, next) => {
    const { query: { token } } = req

    try {
        if (!token) {
            throw new UnAuthorised("Invalid verification link")
        }

        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            throw new UnAuthorised("Invalid verififcation link")
        }

        const newuser = await User.findOneAndUpdate(
            { _id: user.id },
            { isVerified: true, verificationToken: null },
            { new: true }
        )

        res.status(StatusCodes.OK).json({ newuser })
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {

    const { body: { email, password } } = req

    try {
        if (!email || !password) {
            throw new BadRequest("Email and password are required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new UnAuthorised("Email not registered")
        }

        if (!user.isVerified) {
            return res.status(StatusCodes.OK).json({ message: `${user.email} is registered but not verified, verify account` })
        }

        const matchPassword = await User.comparePassword(password, user.password)

        if (!matchPassword) {
            throw new UnAuthorised("Incorrect password")
        }

        const token = User.generateToken(user._id)

        res.status(200).json({user: {
                fullname: user.fullname,
                email: user.email }, token
            })

    } catch (error) {
        next(error)
    }

}


