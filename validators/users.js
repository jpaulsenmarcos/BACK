const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty(),
    check("password").exists().notEmpty().withMessage("PON CONTRASEÑA"),
    check("role").exists(),
    validateResults
]

module.exports = { validatorCreateItem }