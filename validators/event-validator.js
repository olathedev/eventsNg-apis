import Joi from "joi";

const Schema = Joi.object({

    title: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(2).max(300),
    location: Joi.string().required().min(2).max(100),
    time: Joi.required(),
    eventDate: Joi.required(),
    seatsAvailable: Joi.required(),
    createdBy: Joi.required()


})

export const validateEvent = (data) => {
    return Schema.validate(data)
}