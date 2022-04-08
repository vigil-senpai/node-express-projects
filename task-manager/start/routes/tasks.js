const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/tasks')

router.route('/').get(controller.getAllTasks); 


module.exports = router; 