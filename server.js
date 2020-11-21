const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const itemRouter = require('./routes/itemRoutes')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 4000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const mongo_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lvmo4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

// Connecting to cloud database and then start listening to requests
mongoose.connect(mongo_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => app.listen(PORT, () => console.log(`Connected to DB\nRunning on port : ${PORT}`)))
    .catch(err => console.log(err))

// Route handlers
app.use('/api/items', itemRouter)