'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;

var _stringUtil = require('../../utilities/string-util');

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    var validation = validateIndex(req.body);

    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    var user = new _user2.default({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last
    });

    user.save().then(function (user) {
        return res.status(201).json({ success: true, data: user });
    }).catch(function (error) {
        if (error.code === 11000) {
            return res.status(403).json({ errors: 'Username is already taken.' });
        }

        return res.status(500).json({
            errors: {
                message: 'Failed to register user.',
                mongo: error
            }
        });
    });
}

function validateIndex(body) {
    var errors = '';
    if (_stringUtil.StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }

    if (_stringUtil.StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }

    if (_stringUtil.StringUtil.isEmpty(body.first)) {
        errors += 'Firstname is required. ';
    }

    if (_stringUtil.StringUtil.isEmpty(body.last)) {
        errors += 'Lastname is required. ';
    }

    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}