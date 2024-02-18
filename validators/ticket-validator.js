import Joi from "joi";

const Schema = Joi.object({

    ticketType: Joi.string().required(),
    price: Joi.number().required(),
    eventFor: Joi.string().required(),
  

})

export const validateTicket = (data) => {
    return Schema.validate(data)
}