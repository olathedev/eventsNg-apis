import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    ticketType:{
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    eventId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Event",
       required: true 
    }, 

    reservationsAvailable: {
        type: String,
        required: true,
        default: 'unlimited'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})


const TicketModel = mongoose.model('Ticket', TicketSchema)

export default TicketModel