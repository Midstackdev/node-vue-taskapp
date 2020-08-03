'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ref;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stringUtil = require('../utilities/string-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userSchema = new _mongoose2.default.Schema((_ref = {
    username: String,
    first: String
}, _defineProperty(_ref, 'first', String), _defineProperty(_ref, 'pasword', String), _ref));

userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
    var first = _stringUtil.StringUtil.capitalize(this.first.toLowerCase());
    var last = _stringUtil.StringUtil.capitalize(this.last.toLowerCase());
    return first + ' ' + last;
});

userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    next();
});

exports.default = _mongoose2.default.model('user', userSchema);