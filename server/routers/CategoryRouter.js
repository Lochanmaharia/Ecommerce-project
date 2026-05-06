const categoryRouter = require("express").Router();
const { create, read, getById, status, deleteById, readById, update } = require("../controllers/CategoryController")

const fileUploader = require("express-fileupload")
const { protect, authorized } = require("../middleware/auth")
categoryRouter.post("/create", protect, authorized("admin", "superAdmin"), fileUploader({ createParentPath: true }), create);
categoryRouter.get("/",read);
categoryRouter.get("/:id", readById);
categoryRouter.patch("/status-update/:id", protect, authorized("admin", "superAdmin"), status);
categoryRouter.delete("/delete/:id", protect, authorized("admin", "superAdmin"), deleteById);
categoryRouter.get("/:id", getById);
categoryRouter.put("/update/:id", protect, authorized("admin", "superAdmin"), fileUploader({ createParentPath: true }), update);

module.exports = categoryRouter;


