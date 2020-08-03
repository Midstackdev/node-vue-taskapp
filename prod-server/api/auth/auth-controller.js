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

    _user2.default.findOne({ username: req.body.username.toLowerCase() }).then(function (user) {
        if (!user) {
            return res.status(401).json({ errors: 'No user was found.' });
        }

        var passwordMatch = _user2.default.passwordMatches(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ errors: { message: 'Password invalid.' } });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(function (error) {
        return res.status(500).json({
            errors: {
                message: 'Failed to login user.',
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

    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}