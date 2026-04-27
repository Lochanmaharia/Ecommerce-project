const categoryRouter = require("express").Router();
const { create, read, getById, status, deleteById, readById, update } = require("../controllers/CategoryController")

const fileUploader = require("express-fileupload")
categoryRouter.post("/create", fileUploader({ createParentPath: true }), create);
categoryRouter.get("/", read);
categoryRouter.get("/:id", readById);
categoryRouter.patch("/status-update/:id", status);
categoryRouter.delete("/delete/:id", deleteById);
categoryRouter.get("/:id", getById);
categoryRouter.put("/update/:id", fileUploader({ createParentPath: true }), update);

module.exports = categoryRouter;