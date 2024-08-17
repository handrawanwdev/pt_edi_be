const CONTROLLER = `const [MODEL_NAME]_model=require("../model/[MODEL_NAME].model.js");
const response = require("../helper/response");

module.exports={

   init:async(req,res,next)=>{
        try {
            let data=await [MODEL_NAME]_model.init();

            return response.ok(data,res)
        }catch(error){
            console.log(error);
            return response.error({},res,error.message);
        }
   }

};`;

const MODEL=`const knex=require("../database/knex");

module.exports={

    init:async()=>{
        let query=knex.select("*").from("[MODEL_NAME]");

        return query;
    }

};`;

const ROUTER=`const router=require("express").Router();

const controller = require("../controller/[MODEL_NAME].controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/[MODEL_NAME].validate.js");
const validate=require("../middleware/validate_joi.js");

router.post("/init",auth.authjwt,validate.body(schemas.init),controller.init);

module.exports=router;
`

const SCHEMA = `const Joi=require("joi");

module.exports = {
    init: Joi.object({
        data: Joi.string().required()
    }),
}`;

const VIEWS = `
<%- include('../layout/header.ejs') %>
    <%- include('../layout/sidebar.ejs') %>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script>
        $(document).ready(function() {
            var table = $('#myTable').DataTable({
                processing: true,
                serverSide: true,
                ajax: "/agent/table-list",
                type: 'GET',
                columns: [
                    {
                        data: 'id',
                        visible: false
                    },
                    { data: 'agent_id' },
                    { data: 'name' },
                    { data: 'username' },
                    { data: 'email' },
                    { 
                        data: 'created_at',
                        render: function (data, type, row) {
                            return "<span class='badge badge-success'>ok</span>";
                        }
                    },
                    {
                        data: 'id',
                        render: function (data, type, row) {
                            return '<button type="button" class="btn btn-warning btn-sm btnUbah" id="' + data + '"> Ubah</button>'
                                + '&nbsp;<button type="button" class="btn btn-danger btn-sm btnHapus" id="' + data + '"> Hapus</button>';
                        }
                    }
                ]
            });

        });

    </script>
<%- include('../layout/footer.ejs') %>
`;

const SWAGGER_DOCS = `
// [SWAGGER_DOCS].js

/**
 * @openapi
 * /api/[SWAGGER_DOCS]:
 *      get:
 *          tags: [[SWAGGER_DOCS]]
 *          security:
 *              - bearerAuth: []
 *          description: Get the Price List with optional pagination and additional data
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema:
 *                  type: string
 *                description: ID of the price list
 *              - in: query
 *                name: page
 *                schema:
 *                  type: integer
 *                  default: 1
 *                description: Optional page number for pagination
 *              - in: query
 *                name: limit
 *                schema:
 *                  type: integer
 *                  default: 10
 *                description: Optional limit per page for pagination
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              additionalData:
 *                                  type: string
 *                                  description: Additional data in the request body
 *          responses:
 *               200:
 *                    description: Successful response
 *                    content:
 *                      application/json:
 *                        schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                   type: integer
 *                                   example: 200
 *                              message:
 *                                   type: string
 *                                   example: "Price List fetched successfully"
 *                              pagination:
 *                                   type: object
 *                                   properties:
 *                                      page:
 *                                          type: integer
 *                                          example: 1
 *                                      limit:
 *                                          type: integer
 *                                          example: 10
 *                              data:
 *                                   type: array
 *                                   example: [{"id":1,"name":"Price List 1","price":1000}]
 *               500:
 *                    description: Some Server Error
 *               401:
 *                    description: Unauthorized Access. Kindly check Bearer Token
 */
`;

module.exports = {
    CONTROLLER,
    MODEL,
    ROUTER,
    SCHEMA,
    VIEWS,
    SWAGGER_DOCS
}