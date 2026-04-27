const { response, Router } = require("express");
const ProductModel = require("../models/ProductModel");
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response");
const { createUniqueName } = require("../utils/helper");
const fs = require("fs");
const CategoryModel = require("../models/CategoryModel");
const BrandModel = require("../models/BrandModel");
const ColorModel = require("../models/ColorModel");




// CREATE API
const create = async (req, res) => {
    try {
        console.log(req.body);

        const {
            name, slug, price, discount, finalPrice, color_ids,
            short_description, long_description, category_id, brand_id
        } = req.body;

        if (!req.files || !req.files.thumbnail) {
            return sendBadRequest(res, "Thumbnail required");
        }

        const thumbnail = req.files.thumbnail;
        console.log(thumbnail, "thumbnail");

        if (!name || !slug || !price || !discount || !finalPrice ||
            !short_description || !long_description ||
            !color_ids || !category_id || !brand_id) {
            return sendBadRequest(res, "All fields required");
        }

        const product = await ProductModel.findOne({ slug });
        if (product) return sendConflict(res, "Product already exists");

        const image_name = createUniqueName(thumbnail.name);
        const destination = `./public/product/${image_name}`;

        thumbnail.mv(destination, async (err) => {
            if (err) {
                return sendServerError(res, "Unable to Upload File");
            }

            let parsedColors = [];
            try {
                parsedColors = typeof color_ids === "string"
                    ? JSON.parse(color_ids)
                    : color_ids;
            } catch {
                parsedColors = [];
            }

            await ProductModel.create({
                name, slug, price, discount, finalPrice, color_ids: parsedColors, short_description, long_description,
                category_id, brand_id, thumbnail: image_name
            });

            return sendCreated(res, "Product Created Successfully");
        });

    } catch (error) {
        console.log("ERROR:", error);
        return sendServerError(res, error?.message);
    }
};


// READ API
const read = async (req, res) => {
    try {
        const query = req.query;
        const filter = {};
        const sortFilter = {};
        const page = query.page || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = parseInt((page - 1) * limit);
        if (query.status) filter.status = query.status === "true";
        if (query.stock) filter.stock = query.stock === "true";
        if (query.id) filter._id = query.id;

        // category filter
        if (query.category_slug) {
            const category = await CategoryModel.findOne({ slug: query.category_slug });
            filter.category_id = category._id;
        }

        //brand filter
        if (query.brand_slug) {
            const brand = await BrandModel.findOne({ slug: query.brand_slug });
            filter.brand_id = brand._id;
        }

        // color slug filter

        if (query.color_slug) {
            const color_slug = query.color_slug.split(",");
            const color_ids = [];
            for (let slug of color_slug) {
                const color = await ColorModel.findOne({ slug: slug.trim() });
                if (color) {
                    color_ids.push(color._id);
                }
            }
            filter.color_ids = { $in: color_ids };
        }
        if (query.min_price && query.max_price) {
            filter.finalPrice = {
                $gte: parseInt(query.min_price),
                $lte: parseInt(query.max_price)
            };
        }
    
        if (query.sort) {
            if (query.sort === "asc") {
                sortFilter.finalPrice = 1;
            } else if (query.sort === "desc") {
                sortFilter.finalPrice = -1;
            } else {
                sortFilter.createdAt = -1;
            }
        }


        const [total, product] = await Promise.all([
            ProductModel.find().countDocuments(),
            ProductModel.find(filter).limit(limit).skip(skip).sort(sortFilter).populate([
                {
                    select: "name _id slug",
                    path: "category_id"
                },
                {
                    select: "name _id slug",
                    path: "brand_id"
                },
                {
                    select: "name _id color_code slug",
                    path: "color_ids"
                }

            ])
        ])

        if (product.length > 0) {
            return sendSuccess(res, "Product Found", product, {
                total,
                limit,
                pages: Math.ceil(total / limit),
                imageBaseUrl: "http://localhost:5000/product/"
            });
        } else {
            return sendNotFound(res, "No Products Found");
        }

    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
};


const add_images = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) return sendNotFound(res);


        if (!req.files || !req.files.images) return sendBadRequest(res, "No files were uploaded..");

        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const image_names = [];

        for (let image of images) {
            const image_name = createUniqueName(image.name);
            const destination = `./public/product/${image_name}`;
            await image.mv(destination);
            image_names.push(image_name);
        }
        product.images.push(...image_names);
        await product.save();
        return sendSuccess(res, "Images added successfully", product)

    } catch (error) {
        return sendServerError(res);
    }
}


const delete_image = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_name } = req.body;
        const product = await ProductModel.findById(id);
        if (!product) return sendNotFound(res);
        await ProductModel.findByIdAndUpdate(id, { $pull: { images: image_name } });
        fs.unlink(`./public/product/${image_name}`, (err) => {
            if (err) console.log("unable to delete file", err);
            return sendSuccess(res, "Image deleted successfully")
        });




    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
}


const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id).populate([
            {
                select: "name _id",
                path: "category_id"
            },
            {
                select: "name _id",
                path: "brand_id"
            },
            {
                select: "name _id color_code",
                path: "color_ids"
            }

        ])
        if (product) {
            return sendSuccess(res, "Product Found", product, {
                imageBaseUrl: "http://localhost:5000/product"
            })
        }

    } catch (error) {
        sendServerError(res)
    }
};
//UPDATE API
const status = async (req, res) => {
    try {
        const { field } = req.body;
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        if (!product) {
            return sendNotFound(res);
        }
        const fields = ["is_home", "is_top", "is_popular", "status"];
        if (!fields.includes(field)) {
            return sendBadRequest(res)
        }


        await ProductModel.findByIdAndUpdate(
            id,
            {
                [field]: !product[field]
            }
        )
        return sendOk(res, "status update")


    } catch (error) {
        sendServerError(res)
    }
};
// DELETE API
const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        if (!product) {
            return sendNotFound(res);
        }
        await ProductModel.findOneAndDelete({ _id: id });
        return sendOk(res, "Product Deleted")

    } catch (error) {
        sendServerError(res)
    }
};



module.exports = { create, read, add_images, delete_image, readById, status, deleteById }