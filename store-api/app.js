// dependencies
const express = require('express')
const app = express()
require('dotenv').config()

// local variables
const port = process.env.PORT || 8000

// middleware
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
app.use(express.json())

// database connection
const connectDatabase = require('./db/connection')

// routes
const productRoute = require('./routes/products')
app.use('/api/v1/products', productRoute)
app.use(notFound)
app.use(errorHandler)

// server start
const startServer = async () => {
    try {
        await connectDatabase(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`[+] Server start on port ${port}`)
        })
    }
    catch(error) {
        console.log(error)
    }
}

startServer()