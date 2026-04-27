const mongoose = require("mongoose");
const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    color_code: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const colorModel = mongoose.model("Color", colorSchema);
module.exports = colorModel;