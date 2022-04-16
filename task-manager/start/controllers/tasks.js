const Task = require('../models/tasks'); 
const asyncWrapper = require('../middleware/async'); 
const { createCustomError } = require('../errors/custom-error'); 

const getAllTasks = asyncWrapper( async (req, res) => {
    var tasks = await Task.find(); 
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req, res) => {
    var task = await Task.create(req.body); 
    res.status(200).json({task}); 
})

const getTask = asyncWrapper(async (req, res, next) => {
    var searchID = req.params.ID;
    var task = await Task.findOne({'_id': searchID}); 
    if(!task) {
        return next(createCustomError(`No task with id: ${searchID}`, 404)); 
    }
    res.status(201).json({task}); 
})

const updateTask = asyncWrapper(async (req, res, next) => {
    var searchID = req.body._id; 
    var task = await Task.findOneAndUpdate({'_id': searchID}, req.body.data, {new: true, runValidators: true}); 
    if(!task) {
        return next(createCustomError(`No task with id: ${searchID}`, 404)); 
    }
    res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    var searchID = req.body._id; 
    var task = await Task.findOneAndDelete({'_id': searchID}); 
    if(!task) {
        return next(createCustomError(`No task with id: ${searchID}`, 404)); 
    }
    res.status(200).json({task: null, status: 'success'});
})

module.exports = {
    getAllTasks, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}