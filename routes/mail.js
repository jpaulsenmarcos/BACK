const express = require("express")
const { validatorMail } = require("../validators/mail")
const { send } = require("../controllers/mail")
const authMidlleware = require("../middleware/session.js")
const router = express.Router()

router.post("/mail", send)

module.exports = router