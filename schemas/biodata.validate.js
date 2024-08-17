const Joi=require("joi");

module.exports = {

    getAllData: Joi.object({
        limit: Joi.number().integer().min(1).max(100).optional(),
        page: Joi.number().integer().min(1).optional()
    }),

    getDataById: Joi.object({
        id: Joi.string().required()
    }),

    insertData: Joi.object({
        position: Joi.string().required(),
        name: Joi.string().required(),
        ktp: Joi.string().required(),
        birth: Joi.string().required(),
        gender: Joi.string().required(),
        religion: Joi.string().required(),
        blood_type: Joi.string().required(),
        status: Joi.string().required(),
        address_ktp: Joi.string().required(),
        address_live: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        contact_person: Joi.string().required(),
        willing: Joi.string().required(),
        salary: Joi.string().required(),
        last_education: Joi.array().items(Joi.object({
            education: Joi.string().required(),
            institution: Joi.string().required(),
            major: Joi.string().required(),
            year: Joi.string().required(),
            gpa: Joi.string().required(),
        })).required(),
        work_experience: Joi.array().items(Joi.object({
            company: Joi.string().required(),
            last_position: Joi.string().required(),
            last_income: Joi.string().required(),
            year: Joi.string().required(),
        })).required(),
        skill: Joi.array().items(Joi.object({
            course: Joi.string().required(),
            certification: Joi.string().required(),
            year: Joi.string().required(),
        })).required(),
    }),

    updateData: Joi.object({
        position: Joi.string().optional(),
        name: Joi.string().optional(),
        ktp: Joi.string().optional(),
        birth: Joi.string().optional(),
        gender: Joi.string().optional(),
        religion: Joi.string().optional(),
        blood_type: Joi.string().optional(),
        status: Joi.string().optional(),
        address_ktp: Joi.string().optional(),
        address_live: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        contact_person: Joi.string().optional(),
        willing: Joi.string().optional(),
        salary: Joi.string().optional(),
        last_education: Joi.array().items(Joi.object({
            education: Joi.string().optional(),
            institution: Joi.string().optional(),
            major: Joi.string().optional(),
            year: Joi.string().optional(),
            gpa: Joi.string().optional(),
        })).optional(),
        work_experience: Joi.array().items(Joi.object({
            company: Joi.string().optional(),
            last_position: Joi.string().optional(),
            last_income: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
        skill: Joi.array().items(Joi.object({
            course: Joi.string().optional(),
            certification: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
    })

};