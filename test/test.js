const { expect, assert } = require("chai");
const { checkEmailExists, registerUser, loginUser, setAdmin, getProfile } = require("../controllers/userController");

describe("Test User", (reqBody) => {
	it("Test if the email exist in the database", () => {

		let email = checkEmailExists(true)
		assert.equal(email, true);
	});
	
})

