const {customError} = require('../error/custom-error')

const errorHandler = (err, req, res, next) => {
    if(err instanceof customError) {
        console.log(`[-] Error: ${err.message}`)
        return res.status(err.status).json({msg: err.message})
    }
    console.log('[-] Error: Unidentified Error')
    return res.status(500).json({msg: 'Server Error'})
}

module.exports = errorHandler