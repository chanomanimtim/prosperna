const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController")
const auth = require("../auth.js")


// route for ordering a product
router.post("/newOrder", auth.verify, (req,res) => {
	let data = {
		userId: auth.decode(req.headers.authorization).id,
		productId: req.body.productId
	}
    orderController.createOrder(data, req.body).then(resultFromController => res.send(resultFromController))
})

// route for retrieving authenticated user's orders
router.get("/:orderId", (req,res) => {
    orderController.getOrder(req.params).then(resultFromController => res.send(resultFromController))
})

// route for retrieving all order (admin only)
router.get("/", auth.verify, (req,res) => {
    if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(`You are not authorized to use this feature`)
	} else {
		orderController.getAllOrder(req.params).then(resultFromController => res.send(resultFromController))
	}
})

// route for updating order status (admin only)
router.put("/:orderId", auth.verify, (req,res) => {
    if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(`You are not authorized to use this feature`)
	} else {
		orderController.updateOrderStatus(req.params, req.body).then(resultFromController => res.send(resultFromController))
	}
})

module.exports = router;