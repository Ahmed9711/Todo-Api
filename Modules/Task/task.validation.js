import Joi from "joi";

export const createTaskValidation = {
    body:Joi.object().required().keys({
        name: Joi.string().min(3).max(20).required().messages({
            "string.min":"Name must be at least 3 characters"
        }),
        description: Joi.string().optional(),
        status: Joi.string()
    })
}

export const updateTaskValidation = {
    body:Joi.object().required().keys({
        name: Joi.string().min(3).max(20).required().messages({
            "string.min":"Name must be at least 3 characters"
        }),
        description: Joi.string().optional(),
        status: Joi.string()
    }),

    params:Joi.object().required().keys({
        taskId: Joi.string().min(24).required().messages({
            "string.min":"Task Id must be at least 24 characters",
            "any.required": "Task Id is required"
        })
    })
}

export const deleteTaskValidation = {
    params:Joi.object().required().keys({
        taskId: Joi.string().min(24).required().messages({
            "string.min":"Task Id must be at least 24 characters",
            "any.required": "Task Id is required"
        })
    })
}

export const deletSelectedTaskValidation = {
    body: Joi.object().required().keys({
        id: Joi.array().required().messages({
            "any.required": "Task Ids array is required"
        })
        .items(Joi.string().min(24).required().messages({
            "string.min":"Task Id must be at least 24 characters",
            "any.required": "Task Ids are required"
        }))
    })
}