const User = require("../models/User")
const auth = require("../auth.js")
const Product = require("../models/Product")
const Order = require("../models/Order")


// route for User Checkout
module.exports.createOrder = (data, reqBody) => {
    return Product.findById(data.productId).then(result => {
        if (result.stock == 0){
            return (`Product Out of stock`)
        } else{
            let newOrder = new Order({
                quantity: reqBody.quantity,
                totalAmount: result.price * reqBody.quantity,
                orderDetails: {
                    userId: data.userId,
                    productId: reqBody.productId
                },
            
            })
            let updateStock = {
                stock: result.stock - reqBody.quantity
            }
            return Product.findByIdAndUpdate(data.productId, updateStock).then((product, error) =>{
				return newOrder.save().then((order, error)=>{
					if (error) {
						return `You must complete all the fields`
					}else{
						return `Order successfully placed!`
					}
				})				
			})	
        }
    })
	
};

// route for retrieving authenticated user's orders
module.exports.getOrder = (reqParams) => {
    return Order.findById(reqParams.orderId).then((result, error)=>{
        if(error){
            return (`Order not found!`)
        } else{
            return result
        }
    })
}

// route for retrieving all orders (admin only)
module.exports.getAllOrder = () => {
    return Order.find({})
    .populate("orderDetails.userId", "-email -password -__v -isAdmin")
    .populate("orderDetails.productId", "-isActive -createdOn -__v -description -stock")
    .then(result =>{
        return result
    })
}


//route for updating status
module.exports.updateOrderStatus = ( reqParams, reqBody ) => {
	let updateStatus = {
		status: reqBody.status
	}
	return Order.findByIdAndUpdate(reqParams.orderId, updateStatus)
    .then((order, err)=>{
		if (err) {
			return (`Item cannot be found`)
		}else{
			return (`Successfully updated`)
		}
	})
}