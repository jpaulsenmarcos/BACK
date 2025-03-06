const express = require('express')
const { getItem, getItems, updateItem, createItem, deleteItem } = require('../controllers/users.js')
const { validatorCreateItem } = require("../validators/users")
const customHeader = require("../middleware/customHeader.js")
const authMidlleware = require("../middleware/session.js")

const userRouter = express.Router();

userRouter.get('/', authMidlleware, getItems);
userRouter.get('/:email', getItem);
userRouter.post('/', validatorCreateItem, customHeader, createItem);
userRouter.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});
userRouter.delete('/:email', deleteItem);


module.exports = userRouter;