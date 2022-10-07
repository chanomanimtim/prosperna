const User = require("../models/User")
const auth = require("../auth.js")
const Product = require("../models/Product")

// route for getting all active products
module.exports.getAllActive = () => {
    return Product.find({isActive: true}).then(result =>{
        return result
    })
}

// route for retreiving a specific product
module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.productId).then((result, error)=>{
        if(error){
            return (`Product not found!`)
        } else{
            return result
        }
    })
}

// route for creating product (admin only)
module.exports.addProduct = (reqBody) => {
	let newProduct = new Product({
        name : reqBody.name,
        description : reqBody.description,
        price : reqBody.price,
		stock: reqBody.stock
    });
    return newProduct.save().then((product, error) => {
        if (error) {
            return `You must complete all the fields`;
        } else {
            return `${newProduct.name} is successfully created!`;
        };
    });
};

// route for updating product information (admin only)
module.exports.updateProduct = ( reqParams, reqBody ) => {
	let updateProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
		stock: reqBody.stock
	}
	return Product.findByIdAndUpdate(reqParams.productId, updateProduct).then((product, err)=>{
		if (err) {
			return (`Item cannot be found`)
		}else{
			return (`${updateProduct.name} Successfully updated`)
		}
	})
}

// route for archiving product (admin only)
module.exports.archiveProduct = (reqParams) => {
	let updateActiveField = {
		isActive : false
	}
	return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then((product, error) => {
		if (error) {
			return (`Item cannot be found`)
		} else {
			return (`Item Successfully Archived`)
		}
	});
};
