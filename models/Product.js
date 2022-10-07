const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Product name is required"]
    },
    description: {
        type: String,
        required: [true,"Description is required"]
    },
    price: {
        type: Number,
        required: [true,"Price is required"]
    },
    stock: {
        type: Number,
        required: [true,"Stock is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        // creates a new "date" that stores the current date and time of the course creation
        default: new Date()
    }
})

module.exports = mongoose.model("Product", ProductSchema);