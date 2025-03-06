const express = require('express')
const { getItem, getItems, createItem } = require('../controllers/tracks.js')
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const customHeader = require("../middleware/customHeader.js");
const authMiddleware = require('../middleware/session.js');
const checkRol = require("../middleware/rol")

const tracksRouter = express.Router();

tracksRouter.get('/', authMiddleware, getItems);
tracksRouter.get('/:id', authMiddleware, validatorGetItem, customHeader, getItem);
tracksRouter.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)

module.exports = tracksRouter;