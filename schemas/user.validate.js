const Joi=require("joi");

module.exports = {
    login: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    register: Joi.object({
        email : Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        re_password: Joi.string().required().valid(Joi.ref('password')),
    }),
    update_password: Joi.object({
        password: Joi.string().required(),
        new_password: Joi.string().required(),
    }),
    createUser: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    updateUser: Joi.object({
        name: Joi.string().optional(),
        username: Joi.string().optional(),
        password: Joi.string().optional(),
    }),
}