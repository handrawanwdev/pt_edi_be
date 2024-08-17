const router=require("express").Router();

const controller = require("../controller/user.controller.js");

const auth=require("../middleware/auth.js");

const schemas=require("../schemas/user.validate.js");
const validate=require("../middleware/validate_joi.js");

router.post("/login",validate.body(schemas.login),controller.login);
router.post("/register",validate.body(schemas.register),controller.register);
router.patch("/update_password",auth.authjwt,validate.body(schemas.update_password),controller.updatePassword);

router.get("/",auth.authjwt,auth.authIsAdmin,controller.getAllUser);
router.get("/:id",auth.authjwt,auth.authIsAdmin,controller.getUserById);
router.post("/",auth.authjwt,auth.authIsAdmin,validate.body(schemas.createUser),controller.createUser);
router.patch("/:id",auth.authjwt,auth.authIsAdmin,validate.body(schemas.updateUser),controller.updateUser);
router.delete("/:id",auth.authjwt,auth.authIsAdmin,controller.deleteUser);

module.exports=router;
