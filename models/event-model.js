import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seatsAvailable: {
        type: String,
        default: "unlimited"
    },
    isActive: {
        type: Boolean,
        default: true
    },

    tickets: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ticket'
            }
        ]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})


const Event = mongoose.model("Event", EventSchema)

export default Event