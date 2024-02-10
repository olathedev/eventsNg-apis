import { StatusCodes } from "http-status-codes"

export const errorhandler = (err, req, res, next) => {

    let customError = {
        msg: err.message || "Sorry something went wrong",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    if(err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = `${Object.keys(err.keyValue)} already exists`
   }


    res.status(customError.statusCode).json({message: customError.msg})
    // res.status(500).json(err)
}