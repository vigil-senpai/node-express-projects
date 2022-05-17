const { createCustomError } = require('../error/custom-error')
const asyncWrapper = require('../middleware/async-wrapper')

const login = asyncWrapper(async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    if(!(username && password)) {
        return next(createCustomError('Username or Password are not Provided', 400))
    }
    res.send('Fake login/register/signup route')
})

const dashboard = asyncWrapper(async(req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        message: 'Hello Vincent', 
        secret: `Here's your lucky number: ${luckyNumber}`
    })
})

module.exports = {
    login, 
    dashboard
}