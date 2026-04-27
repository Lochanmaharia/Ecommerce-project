const { response } = require("express");
const CategoryModel = require("../models/CategoryModel");
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response");
const { createUniqueName } = require("../utils/helper");

// CREATE API
const create = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const image = req.files?.image;
        if (!name || !slug) return sendBadRequest(res)
        const category = await CategoryModel.findOne({ slug });
        if (category) return sendConflict(res);
        const img_name = createUniqueName(image.name)

        const destination = `./public/category/${img_name}`

        image.mv(destination, async (err) => {
            if (err) {
                return (
                    sendServerError(res, "Unable to Upload File")
                )
            }
            await CategoryModel.create({ name, slug, image: img_name });
            return sendCreated(res)
        });
    } catch (error) {
        const message = error?.message || "Internal Server Error";
        sendServerError(res, message)
        console.log(error);

    }
};

// READ API
const read = async (req, res) => {
    try {
        const query = req.query;
        console.log(query);
        const filter = {};
        const limit = query.limit ? parseInt(query.limit) : 0;
        if (query.status) filter.status = query.status === "true";
        if (query.is_top) filter.is_top = query.is_top === "true";
        if (query.is_popular) filter.is_popular = query.is_popular === "true";
        if (query.is_home) filter.is_home = query.is_home === "true";
        if (query.id) filter._id = query.id;

        
        console.log(filter);
        
        const category = await CategoryModel.find(filter).limit(limit);
        const total = await CategoryModel.find().countDocuments();
        if (category) {
            return sendSuccess(res, "Category Find", category, {
                total,
                imageBaseUrl: "http://localhost:5000/category"
            })
        }

    } catch (error) {
        sendServerError(res)
    }
};

// UPDATE by SLUG
const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (category) {
            return sendSuccess(res, "Category Found", category, {
                imageBaseUrl: "http://localhost:5000/category"
            })
        }

    } catch (error) {
        sendServerError(res)
    }
};

// getById
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if (category) {
            return sendSuccess(res, "Category Find", category)
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
        const category = await CategoryModel.findById(id);
        if (!category) {
            return sendNotFound(res);
        }
        const fields = ["is_home", "is_top", "is_popular", "status"];
        if (!fields.includes(field)) {
            return sendBadRequest(res)
        }


        await CategoryModel.findByIdAndUpdate(
            id,
            {
                [field]: !category[field]
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
        const category = await CategoryModel.findById(id);
        if (!category) {
            return sendNotFound(res);
        }
        await CategoryModel.findOneAndDelete({ _id: id });
        return sendOk(res, "Category Deleted")

    } catch (error) {
        sendServerError(res)
    }
};

//UPDATE ID full

const update = async (req, res) => {
    try {
        const image = req.files?.image || null;
        const id = req.params.id;

        const category = await CategoryModel.findById(id);
        if (!category) return sendNotFound(res);

        const object = {};

        // name & slug update
        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        // image update
        if (image) {
            const img = createUniqueName(image.name);
            const destination = "./public/category/" + img;

            await image.mv(destination); // 🔥 wait till upload
            object.image = img;
        }

        await CategoryModel.updateOne(
            { _id: id },
            { $set: object }
        );

        return sendSuccess(res, "Category updated successfully");

    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
};


module.exports = {
    create, read, getById, status, deleteById, readById, update
}