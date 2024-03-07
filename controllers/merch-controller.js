import { StatusCodes } from 'http-status-codes'
import { NotFound } from '../errors/index.js'
import MerchModel from '../models/merch-model.js'

export const getAllMerch = async (req, res, next) => {

    const {id} = req.params
    try {
        const merch = await MerchModel.find({event: id}).populate('event')
        if(!merch) {
            throw new NotFound('No event found with the provided id')
        }

        res.status(StatusCodes.OK).json({merch})
    } catch (error) {
        next(error)
    }

}

export const createNewMerch = async (req, res, next) => {

    const {userId} = req.user
    const {id} = req.params

    req.body.createdBy = userId
    req.body.event = id

    try {
        const merch = await MerchModel.create(req.body)
        res.status(StatusCodes.CREATED).json({merch})
    } catch (error) {
        next(error)
    }
}