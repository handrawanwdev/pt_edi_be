const Joi=require("joi");

module.exports = {

    getAllData: Joi.object({
        limit: Joi.number().integer().min(1).max(100).optional(),
        page: Joi.number().integer().min(1).optional(),
        name: Joi.string().optional(),
        position: Joi.string().optional(),
        last_education: Joi.string().optional(),
    }),

    getDataById: Joi.object({
        id: Joi.string().required()
    }),

    insertData: Joi.object({
        position: Joi.string().required(),
        name: Joi.string().required(),
        ktp: Joi.string().max(24).required(),
        birth: Joi.string().max(64).required(),
        gender: Joi.string().max(16).optional(),
        religion: Joi.string().max(16).optional(),
        blood_type: Joi.string().max(16).optional(),
        status: Joi.string().max(32).optional(),
        address_ktp: Joi.string().optional(),
        address_live: Joi.string().optional(),
        email: Joi.string().email().required(),
        phone: Joi.string().max(32).required(),
        contact_person: Joi.string().required(),
        proficiency: Joi.string().required(),
        willing: Joi.string().optional(),
        salary: Joi.string().max(32).optional(),
        last_education: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            education: Joi.string().optional(),
            institution: Joi.string().optional(),
            major: Joi.string().optional(),
            year: Joi.string().optional(),
            gpa: Joi.number().optional(),
        })).required(),
        work_experience: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            company: Joi.string().optional(),
            last_position: Joi.string().optional(),
            last_income: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
        skill: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            course: Joi.string().optional(),
            certification: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
    }),

    updateData: Joi.object({
        position: Joi.string().optional(),
        name: Joi.string().optional(),
        ktp: Joi.string().max(24).optional(),
        birth: Joi.string().max(64).optional(),
        gender: Joi.string().max(16).optional(),
        religion: Joi.string().max(16).optional(),
        blood_type: Joi.string().max(16).optional(),
        status: Joi.string().max(32).optional(),
        address_ktp: Joi.string().optional(),
        address_live: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().max(32).optional(),
        contact_person: Joi.string().optional(),
        proficiency: Joi.string().optional(),
        willing: Joi.string().optional(),
        salary: Joi.string().max(32).optional(),
        last_education: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            education: Joi.string().optional(),
            institution: Joi.string().optional(),
            major: Joi.string().optional(),
            year: Joi.string().optional(),
            gpa: Joi.number().optional(),
        })).optional(),
        work_experience: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            company: Joi.string().optional(),
            last_position: Joi.string().optional(),
            last_income: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
        skill: Joi.array().items(Joi.object({
            id: Joi.number().allow(null),
            course: Joi.string().optional(),
            certification: Joi.string().optional(),
            year: Joi.string().optional(),
        })).optional(),
    })

};