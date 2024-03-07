import mongoose from "mongoose";

const MerchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    },

    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {timestamps: true})


const MerchModel = mongoose.model('Merch', MerchSchema)

export default MerchModel