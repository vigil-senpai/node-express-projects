const { CustomError } = require('../error/custom-error')

module.exports = (err, req, res, next) => {
    if(err instanceof CustomError) {
        console.log(`[-] ${err.message}`)
        console.log(err)
        return res.status(err.status).json({
            success: false, 
            message: err.message
        })
    }
    console.log('[-] Unidentified Error')
    console.log(err)
    return res.status(err.status).json({
        success: false, 
        message: 'Unidentified Error'
    })
}