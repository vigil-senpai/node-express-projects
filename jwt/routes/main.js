const express = require('express')
const jwt = require('jsonwebtoken')
const { dashboard, login } = require('../controllers/main')
const auth = require('../middleware/auth')
const { CustomError } = require('../error/custom-error')
const router = express.Router()

router.get('/dashboard', auth, dashboard)

router.post('/login', login)

module.exports = router