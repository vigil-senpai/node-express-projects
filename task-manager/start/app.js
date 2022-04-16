const express = require('express'); 
const app = express(); 
const tasks = require('./routes/tasks'); 
const connection = require('./database/connect');
const notFound = require('./middleware/not-found'); 
const errorHandlreMiddleware = require('./middleware/error-handler'); 
require('dotenv').config(); 
// require('dotenv').config({path: "./.env"}); 
// require('dotenv/config')

const port = process.env.PORT; 

// MIDDLEWARE
app.use(express.json()); 

// ROUTES
app.use('/api/v1/tasks', tasks); 

app.use(notFound); 
app.use(errorHandlreMiddleware); 

// Start Server
const startServer = async () => {
    try {
        await connection.connectDatabase(process.env.MONGO_URI); 
        app.listen(port, () => {
            console.log(`[+] App is listening on port ${port}`); 
        }); 
    }
    catch (error) {
        console.log(error); 
    }
}

startServer()