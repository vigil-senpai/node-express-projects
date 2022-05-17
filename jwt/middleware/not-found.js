module.exports = (req, res) => {
    return res.status(400).json({
        success: false, 
        message: 'Route not Found'
    })
}