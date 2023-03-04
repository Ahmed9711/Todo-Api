import Joi from "joi";

export const SignUpValidation = {
    body:Joi.object().required().keys({
        name: Joi.string().min(3).max(20).required().messages({
            "string.min":"Name must be at least 3 characters"
        }),
        email: Joi.string().email({tlds: {allow: ['com','net']}}).required().messages({
            "string.email":"Email format is In-valid",
            "any.required":"Email is required, please enter your email"
        }),
        age: Joi.number(),
        password: Joi.string().required().min(4).max(12).messages({
            "string.min":"password must be at least 4 characters"
        }),
        cpassword: Joi.string().valid(Joi.ref('password')).messages({
            "any.only":"Confirmation password must match password"
        })
    })
}

export const LoginValidation = {
    body: Joi.object({
        email: Joi.string().email({tlds: {allow: ['com','net']}}).required().messages({
            "string.email":"Email format is In-valid",
            "any.required":"Email is required, please enter your email"
        }),
        password: Joi.string().required().min(4).max(12).messages({
            "string.min":"password must be at least 4 characters"
        })
    }).required()
}

export const updateUserValidation = {
    body:Joi.object().required().keys({
        name: Joi.string().min(3).max(20).required().messages({
            "string.min":"Name must be at least 3 characters"
        }),
        email: Joi.string().email({tlds: {allow: ['com','net']}}).required().messages({
            "string.email":"Email format is In-valid",
            "any.required":"Email is required, please enter your email"
        }),
        age: Joi.number(),
        password: Joi.string().required().min(4).max(12).messages({
            "string.min":"password must be at least 4 characters"
        }),
        cpassword: Joi.string().valid(Joi.ref('password')).messages({
            "any.only":"Confirmation password must match password"
        })
    })
}