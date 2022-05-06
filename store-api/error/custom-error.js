class customError extends Error {
    constructor(message, status) {
        super(message), 
        this.status = status
    }
}

const createCustomError = (message, status) => {
    return new customError(message, status)
}

module.exports = {
    customError, 
    createCustomError
}