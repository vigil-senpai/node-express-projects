const express = require('express'); 
const app = express(); 
const tasks = require('./routes/tasks'); 

const port = 8000; 

// MIDDLEWARE
app.use(express.json()); 

// ROUTES
app.get('/hello', (req, res) => {
    res.send('GG');
}); 

app.use('/api/v1/tasks', tasks); 

// LISTENER
app.listen(port, () => {
    console.log(`[+] App is listening on port ${port}`); 
}); 