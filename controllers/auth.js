const usersModel = require('../models/users.js')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError.js')
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJwt.js")

const registerCtrl = async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password } // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send(data)
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name role email")
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = await encrypt(user.password);
        const check = await compare(req.password, hashPassword)
        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }
        user.set("password", undefined, { strict: false }) //Si no queremos que se muestre el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { loginCtrl, registerCtrl }