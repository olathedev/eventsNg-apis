import { NOT_FOUND, StatusCodes } from "http-status-codes"
import Event from "../models/event-model.js"
import { validateEvent } from "../validators/event-validator.js"
import { BadRequest, NotFound } from "../errors/index.js"
import mongoose from "mongoose"
import TicketModel from "../models/ticket-model.js"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

export const discoverEvents = async (req, res, next) => {

   const query = req.query
   try {
    const event = await Event.find().sort({createdAt: -1})
    res.status(StatusCodes.OK).json({event})
   } catch (error) {
    next(error)
   }
}

export const discoverEventsSingle = async (req, res, next) => {
   const {id} = req.params
    
   try {
    const event = await Event.findById({_id: id})
        if(!event){
        throw new NotFound("No Event with this id")
    }

    const ticket = await TicketModel.find({eventId: event._id})

    res.status(StatusCodes.OK).json({event, ticket})
   } catch (error) {
        next(error)
   }
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

export const uploadImage = async (req, res, next) => {
    try {
        const image = req.files.image.tempFilePath
        console.log(image);
        const result = await cloudinary.uploader.upload(image, {use_filename: true, folder: 'teekety-uploads'})

        console.log(result);

        res.status(StatusCodes.OK).json({image: result.secure_url})

        fs.unlinkSync(image)

    } catch (error) {
        next(error)
    }
}


export const getcreatedEvents = async (req, res, next) => {
    const {user: {userId}} = req

    try {
        const events = await Event.find({createdBy: userId}).sort({createdAt: -1})
        res.status(StatusCodes.OK).json({events})
    } catch (error) {
        next(error)
    }
}

export const getCreatedEventsSingle = async (req, res, next) => {
    const {
        user: {userId}, 
        params: {id}
    } = req

    try {
        const event = await Event.findOne({ _id: id })

        if(!event) {
            throw new NotFound(`No event found with the id - ${id}`)
        }

        res.status(StatusCodes.OK).json({event})
    } catch (error) {
        next(error)
    }

}

export const updateEvent = async (req, res, next) => {
    const {
        params: {id},
        user: {userId}
    } = req

    req.body.createdBy = userId

    try {
        const {error} = validateEvent(req.body)

        if(error) {
            throw new BadRequest(error)
        }

        const event = await Event.findOneAndUpdate({_id: id, createdBy: userId}, req.body, {new: true})
        if(!event) {
            throw new NotFound(`No event found with the id - ${id}`)
        }
        res.status(StatusCodes.OK).json({event})
    } catch (error) {
        next(error)
    }
}

export const deleteEvent = async (req, res, next) => {
    const {params: {id}, user: {userId}} = req

    try {
        const event = await Event.findOneAndDelete({_id: id, createdBy: userId})
        if(!event) {
            throw new NotFound(`No event found with the id - ${id}`)
        }
        res.status(StatusCodes.OK).json({message: "Deleted"})
    } catch (error) {
        next(error)
    }
}

async function getAggregations(id, model, req) {
    let stats =  model.aggregate([
        {$match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }},
        {$group: {_id: id, count: {$sum: 1}}}
    ])

    return stats
}
export const eventStats = async (req, res) => {
    
    let stats = await getAggregations('$isActive', Event, req)
    let ticketStats = await getAggregations(null, TicketModel, req)

    // let ticketStat = TicketModel.aggregate([
    //     {$match: {createdBy: new mongoose.Types}}
    // ])

    stats = stats.reduce((acc, curr) => {
        const {_id: title, count} = curr
        acc[title] = count

        return acc
    }, {})

    ticketStats = ticketStats.reduce((acc, curr) => {
        const {_id: title, count} = curr
        acc['total'] = count

        return acc
    }, {})

    console.log(ticketStats);

    const defaultStats = {
        isActive: stats.true || 0,
        notActive: stats.false || 0,
        tickets: ticketStats.total || 0
        

    }
    console.log(defaultStats);

    res.status(200).json({defaultStats})
}

export const checkout = async (req, res, next) => {

    const body = {
            tx_ref: "hooli-tx-1920bbtytty",
            amount: "100",
            currency: "NGN",
            redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: "user@gmail.com",
                phonenumber: "080****4528",
                name: "Yemi Desola"
            },
            customizations: {
                title: "Pied Piper Payments",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
    }
    try {
        const fwres = await fetch('https://api.flutterwave.com/v3/payments', {
            method: 'POST',
            headers: {'Authorization': 'Bearer FLWSECK_TEST-153299f9c859fd770cc5ec70c62fc876-X'},
            body: JSON.stringify({
                tx_ref: "olaofdeevisadevlikedev",
                amount: "100",
                currency: "NGN",
                redirect_url: "https://events-ng.vercel.app",
                meta: {
                    consumer_id: 23,
                    consumer_mac: "92a3-912ba-1192a"
                },
                customer: {
                    email: "user@gmail.com",
                    phonenumber: "080****4528",
                    name: "Yemi Desola"
                },
                customizations: {
                    title: "Pied Piper Payments",
                    logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                }
        })
        })

        console.log(fwres);

        const response = await fwres.json()
        // console.log(response);
        res.send(response)
    } catch (error) {
        next(error)
    }
}