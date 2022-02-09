const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("authHeader", authHeader);

	if (token == null) return res.status(401).json("You are not authenticated!");

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json("Token is not valid");
		console.log("User form verify ", user);
		req.user = user;
		next();
	});
};

module.exports = verifyToken;
