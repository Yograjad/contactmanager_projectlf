// require("dotenv").config();

const ContactModal = require("../models/contact");
const {getDownloadURL, ref, uploadBytes} = require("firebase/storage");
const {storage} = require("../db/firebase_config");
const {successMessage, errorMessage} = require("../helpers/format_message");

// Get contact
const getAllContact = async (req, res) => {
	console.log("get all contact");
	try {
		const contacts = await ContactModal.find({userId: req.params.userId})
			.sort({name: 1})
			.collation({locale: "en", caseLevel: true});
		res.status(200).json(successMessage(true, "Get Contacts", contacts));
	} catch (err) {
		res.status(500).json(err);
	}
};

// Create contact
const createContact = async (req, res) => {
	console.log("create contact", req.body);
	if (req.error) {
		res.status(400).json(errorMessage(false, "Validation Error", req.error));
	} else {
		const newContact = new ContactModal({
			userId: req.body.userId,
			name: req.body.name,
			phone: req.body.phone,
			photoGraph: req.body.photoGraph,
			favourite: req.body.favourite,
			email: req.body.email,
			address: req.body.address,
		});

		try {
			await newContact.save();
			res.status(201).json(
				successMessage(true, "Contact add Successfully", newContact)
			);
		} catch (err) {
			res.status(404).json(errorMessage(false, err.message));
		}
	}
};

const uploadPhotoGraph = async (req, res) => {
	console.log("uploadPhotoGraph contact", req.file, req.params.userId);
	const userId = req.params.userId;

	let file = req.file;
	console.log("file", file.originalname);
	const storageRef = ref(storage, `/${userId}/${file.originalname}`);
	const uploadTask = uploadBytes(storageRef, file);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
		},
		(error) => console.log(error),
		() => {
			setProgress(100);
			getDownloadURL(uploadTask.snapshot.ref).then((url) =>
				console.log("URL", url)
			);
		}
	);
};

// Delete contact
const deleteContact = async (req, res) => {
	console.log("delete contact", req.params.contactId);

	try {
		const data = await ContactModal.findByIdAndDelete(req.params.contactId);
		console.log("data", data);
		if (!data)
			return res.status(404).json(errorMessage(false, "Contact not found"));
		if (data) {
			res.status(200).json(
				successMessage(true, "Contact Delete Successfully", data)
			);
		}
	} catch (err) {
		res.status(500).json(errorMessage(false, err));
	}
};

// Update contact
const updateContact = async (req, res) => {
	console.log("put contact");
	try {
		const updatedContact = await ContactModal.findByIdAndUpdate(
			req.params.contactId,
			{
				$set: req.body,
			}
		);
		let data = {
			success: true,
			data: updatedContact,
			message: "Contact Updated Successfully",
		};
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAllContact,
	createContact,
	uploadPhotoGraph,
	deleteContact,
	updateContact,
};
