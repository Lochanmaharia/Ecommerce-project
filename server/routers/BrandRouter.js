const brandRouter = require("express").Router();
const { create, read, status,deleteById} = require("../controllers/BrandController")

const fileUploader = require("express-fileupload")
brandRouter.post("/create", fileUploader({ createParentPath: true }), create);
brandRouter.get("/", read);
brandRouter.patch("/status-update/:id", status);
brandRouter.delete("/delete/:id", deleteById);
module.exports = brandRouter;