const express = require("express");
const multer = require("multer");
const {
	getAllContact,
	createContact,
	uploadPhotoGraph,
	deleteContact,
	updateContact,
} = require("../controller/contact");
const verifyToken = require("../helpers/verify_token");
const {contactSchema} = require("../helpers/schemas/validation_schema");
const {validateBody} = require("../helpers/validator");
const {route} = require("express/lib/router");

const router = express.Router();
//multer options
const upload = multer({
	dest: "images",
});

router.get("/:userId", verifyToken, getAllContact);
router.post("/", verifyToken, validateBody(contactSchema), createContact);
// router.post(
// 	"/uploadPhotograph/:userId",
// 	verifyToken,
// 	upload.single("upload"),
// 	uploadPhotoGraph
// );
router.delete("/:contactId", verifyToken, deleteContact);
router.put(
	"/:contactId",
	verifyToken,
	validateBody(contactSchema),
	updateContact
);

// router.route("/").get(getAllContact).post(createContact);
// router
// 	.route("/:id")
// 	.get(getAllContact)
// 	.put(updateContact)
// 	.delete(deleteContact);

module.exports = router;
