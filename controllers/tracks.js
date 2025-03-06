const tracksModel = require('../models/tracks.js')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError.js')

const getItems = async (req, res) => {
    try {
        const user = req.user
        const data = await UserModel.find({})
        res.send({ data, user })
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
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

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await UserModel.create(req.body);
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const deleteItem = async (req, res) => {
    const data = await tracksModel.delete({ _id: id });
    res.json(data)
}

module.exports = { getItem, getItems, createItem }