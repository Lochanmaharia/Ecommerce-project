const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 60
    },
    short_description: {
        type: String,
        maxLength: 200

    },
    long_description: {
        type: String

    },
    price: {
        type: Number,
        default: 200,
        required: true
    },
    discount: {
        type: Number,
        default: 5
    },
    finalPrice: {
        type: Number
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    brand_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand"
    },
    color_ids: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Color"
        }
    ],
    thumbnail: {
        type: String,
        default: null
    },
    images: [
        {
            type: String
        }
    ],
    stock: {
        type: Boolean,
        default: true
    },
    topSelling: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;