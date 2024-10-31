require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./Connect-DB/connect')
const productsRouter = require('./routes/routes')

const notFoundMiddleware = require('./error-handlers/not-found')
const errorMiddleware = require('./error-handlers/error-handler')

app.use(express.json())

app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.nextTick.PORT || 5000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listeing on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()