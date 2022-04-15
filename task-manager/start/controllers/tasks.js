const Task = require('../models/tasks'); 

const getAllTasks = async (req, res) => {
    try {
        var tasks = await Task.find(); 
        res.status(201).json({
            // sucess: true
            status: "success", 
            data: {
                tasks, 
                amount: tasks.length
            }
        });
    }
    catch (error) {
        res.status(500).json({msg: error});
    }
}

const createTask = async (req, res) => {
    try {
        var task = await Task.create(req.body); 
        res.status(200).json({task}); 
    }
    catch(error) {
        res.status(500).json({msg: error});
    }
}

const getTask = async (req, res) => {
    var searchID = req.params.ID;
    try {
        var task = await Task.findOne({'_id': searchID}); 
        if(!task) {
            return res.status(404).json({msg: `ID ${searchID} not found`}); 
        }
        res.status(201).json({task}); 
    }
    catch(error) {
        res.status(500).json({msg: error})
    }
}

const updateTask = async (req, res) => {
    var searchID = req.body._id; 
    try {
        var task = await Task.findOneAndUpdate({'_id': searchID}, req.body.data, {new: true, runValidators: true}); 
        if(!task) {
            return res.status(404).json({msg: `ID ${searchID} not found`}); 
        }
        res.status(200).json({task});
    }
    catch(error) {
        res.status(500).json({msg: error}); 
    }
}

const deleteTask = async (req, res) => {
    var searchID = req.body._id; 
    try {
        var task = await Task.findOneAndDelete({'_id': searchID}); 
        if(!task) {
            return res.status(404).json({msg: `ID ${searchID} not found`}); 
        }
        res.status(200).json({task: null, status: 'success'});
    }
    catch(error) {
        res.status(500).json({msg: error}); 
    }
}

module.exports = {
    getAllTasks, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}