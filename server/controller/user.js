// require("dotenv").config();

const CryptoJS = require("crypto-js");
const UserModal = require("../models/User");
const {successMessage, errorMessage} = require("../helpers/format_message");

const getUser = async (req, res) => {
	console.log("id", req.user.id, "paramid", req.params.id);
	if (req.user.id === req.params.id) {
		try {
			const user = await UserModal.findById(req.params.id);
			const {password, ...info} = user._doc;
			res.status(200).json(info);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("Token expire");
	}
};

// Get all user
const getAllUser = async (req, res) => {
	const query = req.query.new;
	try {
		const user = query
			? await UserModal.find().limit(10)
			: await UserModal.find();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateUser = async (req, res) => {
	if (req.user.id === req.params.id) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.PASSWORD_SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await UserModal.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json(
				successMessage(true, "User Update Successfully", updateUser)
			);
		} catch (err) {
			res.status(500).json(errorMessage(false, error.message));
		}
	} else {
		res.status(403).json(
			errorMessage(fale, "You can update only your account")
		);
	}
};

const deleteUser = async (req, res) => {
	if (req.user.id === req.params.id) {
		try {
			await UserModal.findByIdAndDelete(req.params.id);
			res.status(200).json("User has been delted");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can delete only your account");
	}
};

module.exports = {updateUser, getUser, getAllUser};
