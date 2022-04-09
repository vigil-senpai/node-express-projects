const getAllTasks = (req, res) => {
    res.json({
        'msg': 'get all tasks'
    });
}

const createTask = (req, res) => {
    let id = req.body.id; 
    if(!id) {
        res.json({
            'error': 'please provide id'
        }); 
    }
    else {
        res.json({
            'msg': `create new task: ${req.body.id}`
        });
    }
}

const getTask = (req, res) => {
    res.json({
        'msg': `get a single task ${req.params.ID}`
    });
}

const updateTask = (req, res) => {
    let id = req.body.id; 
    let newName = req.body.name; 
    if(!id || !newName) {
        res.json({
            'msg': 'the parameters aren\'t fully complete'
        })
    }
    else {
        res.json({
            'msg': `update Task ${id}. Changed it's name into ${newName}`
        });
    }
}

const deleteTask = (req, res) => {
    let id = req.body.id; 
    if(!id) {
        res.json({
            'error': 'please provide id'
        }); 
    }
    else {
        res.json({
            'msg': `deleting task with id of ${req.body.id}`
        });
    }
}

module.exports = {
    getAllTasks, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask
}