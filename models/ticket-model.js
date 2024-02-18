import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    ticketType:{
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: String,
        required: true,
    },

    eventFor: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "event",
       required: true 
    }, 

    reservationsAvailable: {
        type: String,
        required: true,
        default: 'unlimited'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})


const TicketModel = mongoose.model('ticket', TicketSchema)

export default TicketModel