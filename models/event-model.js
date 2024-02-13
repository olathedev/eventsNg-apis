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
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    }
    
})

const Event = mongoose.model("event", EventSchema)

export default Event