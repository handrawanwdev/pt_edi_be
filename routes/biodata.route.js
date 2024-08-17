const router=require("express").Router();

const controller = require("../controller/biodata.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/biodata.validate.js");
const validate=require("../middleware/validate_joi.js");

router.get("/",auth.authjwt,validate.query(schemas.getAllData),controller.getAllData);
router.get("/:id",auth.authjwt,validate.param(schemas.getDataById),controller.getDataById);
router.post("/",auth.authjwt,validate.body(schemas.insertData),controller.insertData);
router.put("/:id",auth.authjwt,validate.param(schemas.getDataById),validate.body(schemas.updateData),controller.updateData);
router.delete("/:id",auth.authjwt,validate.param(schemas.getDataById),controller.deleteData);

module.exports=router;
