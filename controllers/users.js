const UserModel = require('../models/users.js')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError.js')

/*const getItems = async (req, res) => {
    console.log(req);
    const data = await UserModel.find();
    res.json(data);   
}*/

const getItems = async (req, res) => {
    try {
        const user = req.user
        const data = await UserModel.find({})
        res.send({ data, user })
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

const createItem = async (req, res) => {
    try {
        console.log("Hola")
        const body = matchedData(req)
        console.log(body)
        const data = await UserModel.create(req.body);
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const updateItem = async (req, res) => {

    const email = req.params.email;
    const data = await UserModel.findOneAndReplace(
        { email },
        req.body, { returnDocument: 'after' });
    res.json(data)
}

const deleteItem = async (req, res) => {
    const data = await UserModel.findOneAndDelete({ email: req.params.email })
    res.json(data)
}

const getItem = async ({ req, res }) => {
    try {
        const { id } = matchedData(req)
        const data = await UserModel.findOne({ email });
        res.json(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

module.exports = { getItem, getItems, updateItem, createItem, deleteItem }