const colorRouter = require("express").Router();
const { create, read, status, deleteById } = require("../controllers/ColorController")

colorRouter.post("/create", create);
colorRouter.get("/", read);
colorRouter.patch("/status-update/:id", status);
colorRouter.delete("/delete/:id", deleteById);
module.exports = colorRouter;

