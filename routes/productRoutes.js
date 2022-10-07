const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")
const auth = require("../auth.js")


// route for getting all active product
router.get("/active", (req,res) => {
    productController.getAllActive().then(resultFromController => res.send(resultFromController))
})

// route for getting one product
router.get("/:productId", (req,res) => {
    productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})

// route for creating product (admin only)
router.post("/createProduct", auth.verify, (req,res)=>{
    if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(`You are not authorized to use this feature`)
	} else {
		productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
	}
})

// route for updating product information (admin only)
router.put('/:productId', auth.verify, (req, res) =>{
	if(auth.decode(req.headers.authorization).isAdmin === false) {
	res.send(`You are not authorized to use this feature`)
} else {
	productController.updateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController));
}
} )

// route for archiving courses (admin only)
router.put("/archive/:productId", auth.verify, (req,res) => {
    if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(`You are not authorized to use this feature`)
	} else {
		productController.archiveProduct(req.params).then(resultFromController => res.send(resultFromController))
	}
})




module.exports = router;