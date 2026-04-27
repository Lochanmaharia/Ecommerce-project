const productRouter = require("express").Router();
const { create, read, readById, add_images, delete_image, status,deleteById } = require("../controllers/ProductController")

const fileUploader = require("express-fileupload")
productRouter.post("/create", fileUploader({ createParentPath: true }), create);
productRouter.get("/", read);
productRouter.get("/:id", readById);
productRouter.put("/remove-image/:id", delete_image);
productRouter.patch("/status-update/:id", status);
productRouter.delete("/delete/:id", deleteById);
productRouter.post("/addimages/:id", fileUploader({ createParentPath: true }), add_images);

module.exports = productRouter;