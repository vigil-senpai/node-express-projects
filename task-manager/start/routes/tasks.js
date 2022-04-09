const express = require('express'); 
const router = express.Router(); 
const controller = require('../controllers/tasks'); 

router.route('/').get(controller.getAllTasks); 

router.route('/').post(controller.createTask); 

router.route('/:ID').get(controller.getTask); 

router.route('/').patch(controller.updateTask); 

router.route('/').delete(controller.deleteTask); 

module.exports = router; 