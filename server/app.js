require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds133920.mlab.com:33920/bacaan-baik`)

