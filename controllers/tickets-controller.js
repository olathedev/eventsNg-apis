import TicketModel from "../models/ticket-model.js";
import Event from "../models/event-model.js";
import { BadRequest, NotFound } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { validateTicket } from "../validators/ticket-validator.js";

export const createTicket = async (req, res, next) => {
    const { id: eventId } = req.params
    const { reservationsAvailable } = req.body
    const {userId} = req.user

    req.body.event = eventId
    req.body.createdBy = userId

    try {
        const event = await Event.findOne({ _id: eventId })
        if (!event) {
            throw new NotFound("Id not found")
        }
        // if (!event.seatsAvailable === "unlimited" && reservationsAvailable === "unlimited") {
        //     throw new BadRequest(`the event ${event.title} has a specified number of seats - ${event.seatsAvailable} -, tickets for this event must have a number cap`)
        // }

        const ticket = await TicketModel.create(req.body)

        res.status(StatusCodes.CREATED).json({ticket})

    } catch (error) {
        next(error)
    }
}


// get All tickets for certain eventss

export const getTickets = async (req, res, next) => {
    const { 
        user: {userId},
        params: {id}
    } = req

    try {
        const ticket = await TicketModel.find({event: id})
        .sort({price: -1})
        .populate('event')
        res.status(StatusCodes.OK).json({ticket})
    } catch (error) {
        next(error)
    }
}


export const updateTicket = async (req, res, next) => {
    const {params: {id}, params: {eventId}} = req
    
    req.body.event = eventId
    
    try {
        const {error} = validateTicket(req.body)
        if(error) {
            throw new BadRequest(error)
        }
        const ticket = await TicketModel.findOneAndUpdate({eventFor: eventId, _id:id}, req.body, {new: true})

        if(!ticket) {
            throw new NotFound("Ticket not found")
        }
        res.status(StatusCodes.OK).json({ticket})
    } catch (error) {
        next(error)
    }

}

export const purchaseTicket = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(req.body)
    } catch (error) {
        next(error)
    }
}