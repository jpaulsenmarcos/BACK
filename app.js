const express = require('express')
const morganBody = require('morgan-body')
const loggerStream = require("./utils/handleLogger.js")
const cors = require('cors')
require('dotenv').config()

const routers = require('./routes')

const dbConnect = require('./config/mongo.js')

const app = express()

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function (req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})

app.use(cors())
app.use(express.json())

app.use('/api', routers)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
})

dbConnect()
