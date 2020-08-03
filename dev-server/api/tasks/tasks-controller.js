import User from '../../models/user'
import Task from '../../models/task'
import moment from 'moment'

export function index(req, res) {
    // FInd all tasks
    Task.find({})
    .populate('author', 'username', 'user')
    .then(tasks => {
        return res.status(200).json({ success: true, data: tasks })
    }).catch(error => {
         return res.status(500).json({ 
            errors: {
                message: 'Tasks not found.',
                mongo: error
            } 
        })
    })
}

export function create(req, res) {
    // Create a tasks
    const id = 10
    User.findById(id).then(user => {

        if(!user) {
            return res.status(500).json({ errors: 'No user was found.'})
        }

        const task = new Task(req.body.task)
        task.author = user._id
        task.dueDate = moment(task.dueDate)

        task.save().then(() => {
            res.status(201).json()
        }).catch(error => {
            return res.status(500).json({ errors: 'Unable to create task.'})
        })
    }).catch(error => {
        return res.status(500).json({ errors: error })
    })
}

export function update(req, res) {
    // Update a tasks
    const id = 10;
    User.findById(id).then(user => {

        if(!user) {
            return res.status(500).json({ errors: 'No user was found.'})
        }

        const task = new Task(req.body.task)
        task.author = user._id
        task.dueDate = moment(task.dueDate)

        Task.findByIdAndUpdate(task._id, task, {new: true}).then((task) => {
            return res.status(204).json({ success: true, data: task })
        }).catch(error => {
         return res.status(500).json({ 
                errors: {
                    message: 'Task not updated.',
                    mongo: error
                } 
            })
        })
    })
    .catch(error => {
         return res.status(500).json({ 
            errors: {
                message: 'User not found.',
                mongo: error
            } 
        })
    })
}

export function remove(req, res) {
    // Delete a tasks
    const id = 5
    Task.findById(req.params.id).then((task) => {
        if(!task) {
            return res.status(500).json({ errors: 'No task was found.'})
        }
        if(task.author._id.toString() !== id) {
             return res.status(403).json({ errors: 'Not allowed to delete someone\'s task.'})
        }
        Task.deleteOne({_id: req.params.id}).then(() => {
            res.status(204).json()
        }).catch(error => {
             return res.status(500).json({ 
                errors: {
                    message: 'Task was not deleted.',
                    mongo: error
                } 
            })
        })

    })
    .catch(error => {
         return res.status(500).json({ 
            errors: {
                message: 'Task not found.',
                mongo: error
            } 
        })
    })
}

export function show(req, res) {
    // Show a tasks by id
    Task.findById(req.params.id).then((task) => {
        if(!task) {
            return res.status(500).json({ errors: 'No task was found.'})
        }
        return res.status(200).json({ success: true, data: task })
    }).catch(error => {
         return res.status(500).json({ 
            errors: {
                message: 'Task not found.',
                mongo: error
            } 
        })
    })
}