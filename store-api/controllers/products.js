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
    const {featured, company, name, sort, field} = req.query
    var {limit, page, numericFilters} = req.query
    const filterQuery = {}
    var sortList, fieldList, skip

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

    if(numericFilters) {
        const opMap = {
            '=': '$eq',
            '>': '$gt', 
            '>=': '$gte',
            '<': '$lt', 
            '<=': '$lte'
        }
        const opt = ['price', 'rating']
        const regEx = /\b(<|<=|=|>|>=)\b/
        numericFilters = numericFilters.replace(
            regEx, (match) => `-${opMap[match]}-`
        )
        numericFilters = numericFilters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(opt.includes(field)) {
                filterQuery[field] = {[operator]: Number(value)}
            }
        })
    }
    if(sort) {
        sortList = sort.split(',').join(' ')
    }
    else {
        sortList = 'createdAt'
    }

    if(field) {
        fieldList = field.split(',').join(' ')
    }
    else {
        fieldList = 'name price featured rating company'
    }

    if(!page) {
        page = 1
    }

    if(!limit) {
        limit = 10
    }

    skip = (page - 1) * limit

    const products = await Product
        .find(filterQuery)
        .sort(sortList)
        .select(fieldList)
        .skip(skip)
        .limit(limit)
    console.log('[*] GET All Products')
    res.status(200).json({
        nbHits: products.length, 
        page: page, 
        products: products
    })
})

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}