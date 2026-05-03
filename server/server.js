require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors("*"));
app.use(express.static("./public"))
app.use(express.json());
app.use("/api/category",require("./routers/CategoryRouter"))
app.use("/api/brand",require("./routers/BrandRouter"))
app.use("/api/color",require("./routers/ColorRouter"))
app.use("/api/product",require("./routers/ProductRouter"))
app.use("/api/user",require("./routers/UserRouter"))



mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("Database Is Connected Successfully");

        app.listen(
            process.env.PORT,
            () => {
        console.log(`Server is running on port ${process.env.PORT}`);
            }
        )
    }
).catch(
    (error) => {
    console.error("Database connection failed:", error.message);

    })