const jwt = require("jsonwebtoken")
// used in algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = "This is a secret password"

/*
	JSONWEBTOKEN
	- JSON Web Token or JWT is a way of securely passing information from the server to the frontend or to other parts of server
	- Information is kept secure through the use of the secret code
	- Only the system that knows the secret code can decode the encrypted information
*/


module.exports.createAccessToken = (user) => {
    // The data will be received from the registration form/ database
	// When the user logs in, a token will be created with user's information

    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    // Generate a JSON web token using the jwt's sign method
	// Generates the token using the form data and the secret code with no additional options provided

    return jwt.sign(data, secret, {})
}

// Token verification
module.exports.verify = (req,res, next)=> {
    // the token is retrieved from the request header
	// POSTMAN - Authorization - Bearer Token

    let token = req.headers.authorization

    if(typeof token !== "undefined"){
        console.log(token)
        // the token sent is a type of "Bearer" token which when received, contains the "Bearer " as a prefix to the string
        token = token.slice(7, token.length)
        //  verify() - validates the token decrypting the token using the secret code
        return jwt.verify(token, secret, (err, data) => {
            // should the jwt is invalid
            if (err){
                return res.send({auth: "failed"});
            } else {
                // allows the application to proceed with the next middleware function/callback function in the route
                next()
            }
        })
    } else{
        return res.send({auth: "failed"})
    }
}

// Token decryption
module.exports.decode = (token) => {
    if (typeof token !== "undefined"){
        token = token.slice(7, token.length)
        return jwt.verify(token, secret, (err, data) => {
            if(err){
                return null
            } else {
                // "decode" method is used to obtain the iformation from the JWT
				// the "token" argument serves as the one to be decoded
				// {complete: true} - option that allows us to return additional information from the JWT token
				// .payload property contains the information provided in the "createAccessToek" method defined above(values for id, email, isAdmin)

                return jwt.decode(token, {complete: true}).payload
            }
        })
    } else {
        // if the token does not exist
        return null
    }
}