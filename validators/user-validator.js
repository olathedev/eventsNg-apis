import Joi from "joi";

const Schema = Joi.object({

    fullname: Joi.string().required().min(6).max(50),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(6).max(20)


})

export const validate = (data) => {
    return Schema.validate(data)
}