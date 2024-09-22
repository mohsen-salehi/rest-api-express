const express = require("express");
const { verify } = require("../controllers/verify.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/verify", authMiddleware, verify);

module.exports = router;
