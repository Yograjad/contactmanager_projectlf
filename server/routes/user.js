const express = require("express");
const {updateUser, getUser} = require("../controller/user");
const verifyToken = require("../helpers/verify_token");

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, getUser);

module.exports = router;
