const { response } = require("express");
const BrandModel = require("../models/BrandModel");
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response");
const { createUniqueName } = require("../utils/helper");

// CREATE API
const create = async (req, res) => {
    try {
        const { name, slug, categoryId } = req.body;

        const image = req.files?.image;
        if (!name || !slug || !image || !categoryId) return sendBadRequest(res)
        const brand = await BrandModel.findOne({ slug });
        if (brand) return sendConflict(res);
        const img_name = createUniqueName(image.name)

        const destination = `./public/brand/${img_name}`

        image.mv(destination, async (err) => {
            if (err) {
                return (
                    sendServerError(res, "Unable to Upload File")
                )
            }
            await BrandModel.create({ name, slug, image: img_name, categoryId: JSON.parse(categoryId) });
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
        const filter = {};
        if (query.status) filter.status = query.status === "true";
        if (query.is_top) filter.is_top = query.is_top === "true";
        if (query.is_popular) filter.is_popular = query.is_popular === "true";
        if (query.is_home) filter.is_home = query.is_home === "true";
        if (query.id) filter._id = query.id;

        const brand = await BrandModel.find(filter);
        const total = await BrandModel.find().countDocuments();
        return sendSuccess(res, "brand Find", brand, {
            total,
            imageBaseUrl: "http://localhost:5000/brand"
        });

    } catch (error) {
        console.log("READ BRAND ERROR:", error);
        sendServerError(res, error.message);
    }
};

//UPDATE API
const status = async (req, res) => {
    try {
        const { field } = req.body;
        const id = req.params.id;
        const brand = await BrandModel.findById(id);
        if (!brand) {
            return sendNotFound(res);
        }
        const fields = ["is_home", "is_top", "is_popular", "status"];
        if (!fields.includes(field)) {
            return sendBadRequest(res)
        }


        await BrandModel.findByIdAndUpdate(
            id,
            {
                [field]: !brand[field]
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
        const brand = await BrandModel.findById(id);
        if (!brand) {
            return sendNotFound(res);
        }
        await BrandModel.findOneAndDelete({ _id: id });
        return sendOk(res, "Brand Deleted")

    } catch (error) {
        sendServerError(res)
    }
};


// // UPDATE by SLUG
// const readById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const category = await BrandModel.findById(id);
//         if (category) {
//             return sendSuccess(res, "Category Found", category, {
//                 imageBaseUrl: "http://localhost:5000/category"
//             })
//         }

//     } catch (error) {
//         sendServerError(res)
//     }
// };

// // getById
// const getById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const category = await BrandModel.findById(id);
//         if (category) {
//             return sendSuccess(res, "Category Find", category)
//         }

//     } catch (error) {
//         sendServerError(res)
//     }
// };


// //UPDATE ID full

// const update = async (req, res) => {
//     try {
//         const image = req.files?.image || null;
//         const id = req.params.id;

//         const category = await CategoryModel.findById(id);
//         if (!category) return sendNotFound(res);

//         const object = {};

//         // name & slug update
//         if (req.body.name) {
//             object.name = req.body.name;
//             object.slug = req.body.slug;
//         }

//         // image update
//         if (image) {
//             const img = createUniqueName(image.name);
//             const destination = "./public/category/" + img;

//             await image.mv(destination); // 🔥 wait till upload
//             object.image = img;
//         }

//         await CategoryModel.updateOne(
//             { _id: id },
//             { $set: object }
//         );

//         return sendSuccess(res, "Category updated successfully");

//     } catch (error) {
//         console.log(error);
//         return sendServerError(res);
//     }
// };


module.exports = {
    create, read, status,deleteById
}