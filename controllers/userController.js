const User = require("../models/User.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const auth = require("../auth.js");

const bcrypt = require("bcrypt");


module.exports.checkEmailExists = ( reqBody ) => {
	return User.find( { email: reqBody.email } ).then( result => {
		// if there is an existing duplicate email
		if (result.length > 0){
			return true;
		}else{
		// if the user email is not yet registered in our database
			return false;
		}
	} )
};

// User Registration

module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		// hashSync - bcrypt's method for encrypting the password of the user once they have successfully registered in our database
			/*
				first parameter - the value to which the encryption will be done -  password coming from the request body

				"10" - it dictates how may "salt" rounds are to be given to encrypt the value
			*/
		password: bcrypt.hashSync(reqBody.password, 10)
	})
	return newUser.save().then((user, error) =>{
		if (error) {
			return false;
		}else{
			return (`User: ${reqBody.firstName} Sucessfully Registered!`);
		}
	})
};

// User Authentication
module.exports.loginUser = ( reqBody ) => {
	return User.findOne( { email: reqBody.email } ).then(result =>{
		// if the user email does not exist
		if(result === null){
			return false;
		// if the user email exists in the database
		} else {
			// compareSync = decodes the encrypted password from the database and compares it to the password received from the request body
			// it's a good that if the value returned by a method/function is boolean, the variable name should be answerable by yes/no
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if(isPasswordCorrect){
				return { access: auth.createAccessToken(result) }
			}else{
				return (`Incorrect email/password`)
			}
		}
	} )
} 

// route for set user as admin (admin only)
module.exports.setAdmin = (reqParams) => {
	let updateActiveField = {
		isAdmin : true
	}
	return User.findByIdAndUpdate(reqParams.userId, updateActiveField).then((user, error) => {
		if (error) {
			return (`User cannot be found`)
		} else {
			return (`${user.firstName} succesfully set to Admin`)
		}
	});
};


// Retrieve user details
module.exports.getProfile = () => {
    return User.find({}).then(result =>{
		result.password = ""
        return result
    })
}

// module.exports = {
// 	checkEmailExists: checkEmailExists,
// 	registerUser: registerUser,
// 	loginUser: loginUser,
// 	setAdmin: setAdmin,
// 	getProfile: getProfile
// }