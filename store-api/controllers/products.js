const { createCustomError } = require("../error/custom-error")
const asyncWrapper = require('../middleware/async-wrapper')

const getAllProducts = asyncWrapper(async (req, res, next) => {
    res.status(200).json({
        msg: 'Products Testing Routes'
    })
})

const getAllProductsStatic = async(req, res) => {
    res.status(200).json({
        msg: 'Products Testing Routes (Static)'
    })
}

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}