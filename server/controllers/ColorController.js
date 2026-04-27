const { response } = require("express");
const ColorModel = require("../models/ColorModel");
const { sendCreated, sendBadRequest, sendNotFound, sendServerError, sendConflict, sendSuccess, sendOk } = require("../utils/response");

// CREATE API
const create = async (req, res) => {
    try {
        const { name, slug, color_code } = req.body;
        if (!name || !slug || !color_code) return sendBadRequest(res)
        const color = await ColorModel.findOne({ slug });
        if (color) return sendConflict(res);
        await ColorModel.create({ name, slug, color_code });
        return sendCreated(res)


    } catch (error) {
        return sendServerError(res, error)
    }
};
// READ API
const read = async (req, res) => {
    try {

        const query = req.query;
        const filter = {};
        const limit = query.limit ? parseInt(query.limit) : 0;
        if (query.status) filter.status = query.status === "true";
        if (query.id) filter._id = query.id;
        const color = await ColorModel.find(filter).limit(limit);
        const total = await ColorModel.find().countDocuments();
        if (color) {
            return sendSuccess(res, "color Find", color, {
                total
            })
        }

    } catch (error) {
        sendServerError(res)
    }
};

// DELETE API
const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const color = await ColorModel.findById(id);
        if (!color) {
            return sendNotFound(res);
        }
        await ColorModel.findOneAndDelete({ _id: id });
        return sendOk(res, "Color  Deleted")

    } catch (error) {
        sendServerError(res)
    }
};

//UPDATE Status
const status = async (req, res) => {
    try {
        const { field } = req.body;
        const id = req.params.id;
        const color = await ColorModel.findById(id);
        if (!color) {
            return sendNotFound(res);
        }
        const fields = ["is_home", "is_top", "is_popular", "status"];
        if (!fields.includes(field)) {
            return sendBadRequest(res)
        }


        await ColorModel.findByIdAndUpdate(
            id,
            {
                [field]: !color[field]
            }
        )
        return sendOk(res, "status update")


    } catch (error) {
        sendServerError(res)
    }

 
};
module.exports = { create, read, status, deleteById }