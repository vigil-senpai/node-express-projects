const { createCustomError } = require('../error/custom-error')
const asyncWrapper = require('../middleware/async-wrapper')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
require('dotenv').config()

const login = asyncWrapper(async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const id = uuid.v4()
    if(!(username && password)) {
        return next(createCustomError('Username or Password are not Provided', 400))
    }
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    return res.status(200).json({
        success: true, 
        message: 'User Created', 
        token: token
    })
})

const dashboard = asyncWrapper(async(req, res, next) => {
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next(createCustomError('No Token Provided', 401))
    }

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const luckyNumber = Math.floor(Math.random() * 100)
    return res.status(200).json({
        message: `Hello ${decoded.username}!`, 
        secret: `Here's your lucky number: ${luckyNumber}`
    })
})

module.exports = {
    login, 
    dashboard
}