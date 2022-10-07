const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const auth = require("../auth.js")

// Route for checking if the user's email already exists in the database
router.post('/checkEmail', (req,res)=>{
    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController))
})

// route for user registration
router.post('/register', (req,res)=>{
    userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
})

// route for user authentication
router.post("/login",(req,res)=>{
    userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
})

// route for setting up user as admin
router.put("/setAdmin/:userId", auth.verify, (req,res) => {
    if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		userController.setAdmin(req.params).then(resultFromController => res.send(resultFromController));
	}
})

// route for getting all active user
router.get("/all", (req,res) => {
    userController.getProfile().then(resultFromController => res.send(resultFromController))
})

module.exports = router