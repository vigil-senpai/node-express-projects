const { createCustomError } = require("../error/custom-error")
const asyncWrapper = require('../middleware/async-wrapper')
const Product = require('../models/products')

const getAllProductsStatic = asyncWrapper(async (req, res, next) => {
    const products = await Product.find().sort('name')
    res.status(200).json({
        nbHist: products.length, 
        products: products
    })
})

const getAllProducts = asyncWrapper(async(req, res) => {
    const {featured, company, name, sort} = req.query
    const filterQuery = {}

    if(featured) {
        filterQuery.featured = featured === 'true'? true: false
    }
    if(company) {
        filterQuery.company = {
            $regex: company, 
            $options: 'i'
        }
    }
    if(name) {
        filterQuery.name = {
            $regex: name, 
            $options: 'i'
        }
    }
    console.log('[*]', filterQuery)
    const products = await Product.find(filterQuery)
    res.status(200).json({
        nbHits: products.length, 
        products: products
    })
})

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}