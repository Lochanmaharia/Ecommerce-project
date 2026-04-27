const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
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
    },
    categoryId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            default: []
        }
    ]
},
    {
        timestamps: true
    }
)

const brandModel = mongoose.model("Brand", brandSchema);
module.exports = brandModel;