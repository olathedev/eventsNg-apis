import { StatusCodes } from "http-status-codes"
import Event from "../models/event-model.js"
import { validateEvent } from "../validators/event-validator.js"
import { BadRequest } from "../errors/index.js"

export const discoverEvents = async (req, res, next) => {
    res.json("Discover events")
}

export const discoverEventsSingle = async (req, res, next) => {
    res.send("Discover events")
}


export const createEvent = async (req, res, next) => {
    const {userId} = req.user
    req.body.createdBy = userId

    try {
        const {error} = validateEvent(req.body)
        if(error) {
            throw new BadRequest(error)
        }
        const event = await Event.create(req.body)
        res.status(StatusCodes.CREATED).json({event})
    } catch (error) {
        next(error)
    }
}

export const getcreatedEvents = async (req, res, next) => {
   res.status(200).json("working route")
}

export const getCreatedEventsSingle = async (req, res, next) => {
    res.json("Discover events")
}

export const updateEvent = async (req, res, next) => {
    res.json("Discover events")
}
export const deleteEvent = async (req, res, next) => {
    res.json("Discover events")
}
