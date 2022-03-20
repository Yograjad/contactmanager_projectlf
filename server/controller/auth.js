// require("dotenv").config();

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user");
const {EXPIRES_IN} = require("../constant");
const {successMessage, errorMessage} = require("../helpers/format_message");

const registerUser = async (req, res) => {
	console.log("register users");

	if (req.error)
		return res
			.status(400)
			.json(errorMessage(false, "Validation Error", req.error));

	try {
		const newUser = new UserModal({
			email: req.body.email,
			password: CryptoJS.AES.encrypt(
				req.body.password,
				process.env.PASSWORD_SECRET_KEY
			).toString(),
		});

		await newUser.save();

		res.status(201).json(
			successMessage(true, "User Regiser Successfully", newUser)
		);
	} catch (err) {
		res.status(409).json(errorMessage(false, err.message));
	}
};

const loginUser = async (req, res) => {
	if (req.error)
		return res
			.status(400)
			.json(errorMessage(false, "Validation Error", req.error));

	try {
		const user = await UserModal.findOne({email: req.body.email});

		if (!user)
			return res
				.status(401)
				.json(errorMessage(false, "User doesn't exists"));

		const bytes = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASSWORD_SECRET_KEY
		);
		var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		if (originalPassword !== req.body.password)
			return res.status(401).json(errorMessage(false, "Wrong password"));

		// Create JWT
		const accessToken = jwt.sign(
			{id: user._id, email: user.email},
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: EXPIRES_IN}
		);

		console.log("Access Token", accessToken);

		const {password, ...info} = user._doc;
		res.status(200).json(
			successMessage(true, "User Logged In Successfully", {
				...info,
				accessToken,
			})
		);
	} catch (err) {
		res.status(404).json(errorMessage(false, err.message));
	}
};

module.exports = {registerUser, loginUser};
