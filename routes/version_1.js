const router=require("express").Router();

router.use("/user",require("./user.route"));
router.use("/biodata",require("./biodata.route"));

module.exports=router;