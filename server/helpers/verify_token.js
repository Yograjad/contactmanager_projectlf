const jwt = require("jsonwebtoken");
const {successMessage, errorMessage} = require("../helpers/format_message");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("authHeader", authHeader);

	if (token == null)
		return res
			.status(401)
			.json(errorMessage(false, "You are not authenticated!"));

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err)
			return res
				.status(403)
				.json(errorMessage(false, "Token is not valid ok"));
		console.log("User form verify ", user);
		req.user = user;
		next();
	});
};

module.exports = verifyToken;
