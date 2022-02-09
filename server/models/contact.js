const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
	{
		userId: {type: String, required: true},
		name: {type: String, required: true},
		phone: {type: Number, required: true},
		photoGraph: {type: String, default: "", required: true},
		favourite: {type: Boolean, required: true},
		email: {type: String, required: false},
		address: {type: String, required: false},
	},
	{timestamps: true}
);

ContactModal = mongoose.model("Contact", ContactSchema);
module.exports = ContactModal;
