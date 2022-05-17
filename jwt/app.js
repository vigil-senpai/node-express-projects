const express = require('express')
const app = express()

const notFound = require('./middleware/not-found')
const customErrorHandler = require('./middleware/custom-error-handler')
const { createCustomError } = require('./error/custom-error')

require('dotenv').config()

const port = process.env.PORT || 8000

app.use(express.json())

app.route()

app.use(notFound)
app.use(customErrorHandler)

app.listen(port, () => {
    console.log(`[+] Server Listening on Port ${port}`)
})