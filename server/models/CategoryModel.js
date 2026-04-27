const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    is_home: {
        type: Boolean,
        default: false
    },
    is_top: {
        type: Boolean,
        default: false
    },
    is_popular: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const categoryModel=mongoose.model("Category",categorySchema);
module.exports=categoryModel;

