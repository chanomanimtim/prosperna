const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    orderDetails: [
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                // required: [true,"userId is required"]
            },
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                // required: [true,"productId is required"]
            }
        }
    ],
    status: {
        type: String,
        default: "Pending"
    }

})

module.exports = mongoose.model("Order", OrderSchema);