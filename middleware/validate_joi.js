const response = require('../helper/response')

module.exports = {
    header: (schema) => {
        return (req, res, next) => {
            const field=req.headers;
            if (schema.validate(field).error) {
                // console.log(schema.validate(field).error.details);
                let list_error=schema.validate(field).error.details;
                if(list_error.length>0){
                    list_error=list_error.map((item)=>({'message':item.message,'code':'1350'}));
                }
                let catch_error = list_error.length>0?list_error[0]:{};
                return response.bad(catch_error,res);
            }
            next();
        }
    },
    body: (schema) => {
        return (req, res, next) => {
            const field=req.body;
            if (schema.validate(field).error) {
                // console.log(schema.validate(field).error.details);
                let list_error=schema.validate(field).error.details;
                if(list_error.length>0){
                    list_error=list_error.map((item)=>({'message':item.message,'code':'1350'}));
                }
                let catch_error = list_error.length>0?list_error[0]:{};
                return response.bad(catch_error,res);
            }
            next();
        }
    },
    query: (schema) => {
        return (req, res, next) => {
            const field=req.query;
            if (schema.validate(field).error) {
                // console.log(schema.validate(field).error.details);
                let list_error=schema.validate(field).error.details;
                if(list_error.length>0){
                    list_error=list_error.map((item)=>({'message':item.message,'code':'1350'}));
                }
                let catch_error = list_error.length>0?list_error[0]:{};
                return response.bad(catch_error,res);
            }
            next();
        }
    },
    param: (schema) => {
        return (req, res, next) => {
            const field=req.params;
            if (schema.validate(field).error) {
                // console.log(schema.validate(field).error.details);
                let list_error=schema.validate(field).error.details;
                if(list_error.length>0){
                    list_error=list_error.map((item)=>({'message':item.message,'code':'1350'}));
                }
                let catch_error = list_error.length>0?list_error[0]:{};
                return response.bad(catch_error,res);
            }
            next();
        }
    }
}