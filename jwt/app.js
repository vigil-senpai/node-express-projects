const express = require('express')
require('dotenv').config()

const notFound = require('./middleware/not-found')
const customErrorHandler = require('./middleware/custom-error-handler')
const { createCustomError } = require('./error/custom-error')

const mainRouter = require('./routes/main')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(notFound)
app.use(customErrorHandler)

const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`[+] Server Listening on Port ${port}`)
        })
    }
    catch(err) {
        console.log('[-] Start Error')
    }
}

startServer()