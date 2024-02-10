import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
    verificationToken: {
        type: String,
        maxlength: 50

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})