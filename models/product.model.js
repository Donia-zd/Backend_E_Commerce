const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            //required: true,
        },
        categories: {
            type: Array,
            default: [],
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        Price: {
            type: String,
        },
    },
    {
        timestamps: true,

    }
);
module.exports = mongoose.model("Prodcut", productModel);