const {CustomAPIError} = require('../errors/custom-error'); 
const errorHandlreMiddleware = (err, req, res, next) => { 
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message}); 
    }
    return res.status(500).json({msg: 'Something\'s Wrong'}); 
}

module.exports = errorHandlreMiddleware; 