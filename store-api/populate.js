require('dotenv').config()

const connectDatabase = require('./db/connection')
const Product = require('./models/products')

const jsonProducts = require('./products.json')

const startPopulate = async () => {
    try {
        await connectDatabase(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('[+] Sucess')
        process.exit(0)
    }
    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

startPopulate()