const mongoose = require('mongoose')

const connectDatabase = (uri) => {
    return mongoose.connect(uri, () => {
        useNewUrlParser = true, 
        useCreateIndex = true, 
        useFindAndModify = true, 
        useUnifiedTopology = true
    })
}

module.exports = connectDatabase