const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const { createCustomError } = require('../error/custom-error')
const asyncWrapper = require('../middleware/async-wrapper')
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
    const luckyNumber = Math.floor(Math.random() * 100)
    return res.status(200).json({
        message: `Hello ${req.user.username}!`, 
        secret: `Here's your lucky number: ${luckyNumber}`
    })
})

module.exports = {
    login, 
    dashboard
}