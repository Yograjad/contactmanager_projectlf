const express = require("express");
const {registerUser, loginUser} = require("../controller/auth");
const {registerUserSchema} = require("../helpers/schemas/validation_schema");
const {validateBody} = require("../helpers/validator");

const router = express.Router();

registerUserSchema.validateAsync;

router.post("/register", validateBody(registerUserSchema), registerUser);
router.post("/login", validateBody(registerUserSchema), loginUser);

module.exports = router;
