import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a valid value for fullname']
    },

    email: {
        type: String,
        required: [true, 'Provide a valid value for email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Provide a valid value for Password'],
        minLenght: 6,
        maxLength: 20
    }
}, {timestamps: true})


UserSchema.pre('save', async function() {
    console.log("new user")
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.statics.generateToken = (id) => {
    const token = jwt.sign({userId: id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    return token
}

UserSchema.statics.comparePassword = async function(candidatePassword, docPassword) {
    const match = await bcrypt.compare(candidatePassword, docPassword)
    return match
}

const User = mongoose.model("user", UserSchema)

export default User