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

const userRouter = require('./routers/user_router.js')
const bookRouter = require('./routers/book_router')

app.use('/user', userRouter)
app.use('/book', bookRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
