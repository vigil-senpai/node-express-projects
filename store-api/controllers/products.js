const getAllProducts = async (req, res) => {
    res.status(200).json({
        msg: 'Products Testing Routes'
    })
}

const getAllProductsStatic = async(req, res) => {
    res.status(200).json({
        msg: 'Products Testing Routes'
    })
}

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}