'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _task = require('../../models/task');

var _task2 = _interopRequireDefault(_task);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _authServices = require('../../services/auth-services');

var auth = _interopRequireWildcard(_authServices);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    // FInd all tasks
    _task2.default.find({}).populate('author', 'username', 'user').then(function (tasks) {
        return res.status(200).json({ success: true, data: tasks });
    }).catch(function (error) {
        return res.status(500).json({
            errors: {
                message: 'Tasks not found.',
                mongo: error
            }
        });
    });
}

function create(req, res) {
    // Create a tasks
    var id = auth.getUserId(req);
    _user2.default.findById(id).then(function (user) {

        if (!user) {
            return res.status(500).json({ errors: 'No user was found.' });
        }

        var task = new _task2.default(req.body.task);
        task.author = user._id;
        task.dueDate = (0, _moment2.default)(task.dueDate);

        task.save().then(function () {
            res.status(201).json();
        }).catch(function (error) {
            return res.status(500).json({ errors: 'Unable to create task.' });
        });
    }).catch(function (error) {
        return res.status(500).json({ errors: error });
    });
}

function update(req, res) {
    // Update a tasks
    var id = auth.getUserId(req);
    _user2.default.findById(id).then(function (user) {

        if (!user) {
            return res.status(500).json({ errors: 'No user was found.' });
        }

        var task = new _task2.default(req.body.task);
        task.author = user._id;
        task.dueDate = (0, _moment2.default)(task.dueDate);

        _task2.default.findByIdAndUpdate(task._id, task, { new: true }).then(function (task) {
            return res.status(204).json({ success: true, data: task });
        }).catch(function (error) {
            return res.status(500).json({
                errors: {
                    message: 'Task not updated.',
                    mongo: error
                }
            });
        });
    }).catch(function (error) {
        return res.status(500).json({
            errors: {
                message: 'User not found.',
                mongo: error
            }
        });
    });
}

function remove(req, res) {
    // Delete a tasks
    var id = auth.getUserId(req);
    _task2.default.findById(req.params.id).then(function (task) {
        if (!task) {
            return res.status(500).json({ errors: 'No task was found.' });
        }
        if (task.author._id.toString() !== id) {
            return res.status(403).json({ errors: 'Not allowed to delete someone\'s task.' });
        }
        _task2.default.deleteOne({ _id: req.params.id }).then(function () {
            res.status(204).json();
        }).catch(function (error) {
            return res.status(500).json({
                errors: {
                    message: 'Task was not deleted.',
                    mongo: error
                }
            });
        });
    }).catch(function (error) {
        return res.status(500).json({
            errors: {
                message: 'Task not found.',
                mongo: error
            }
        });
    });
}

function show(req, res) {
    // Show a tasks by id
    _task2.default.findById(req.params.id).then(function (task) {
        if (!task) {
            return res.status(500).json({ errors: 'No task was found.' });
        }
        return res.status(200).json({ success: true, data: task });
    }).catch(function (error) {
        return res.status(500).json({
            errors: {
                message: 'Task not found.',
                mongo: error
            }
        });
    });
}