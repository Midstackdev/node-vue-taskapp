'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stringUtil = require('../utilities/string-util');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    username: {
        type: String,
        unique: true
    },
    first: String,
    last: String,
    password: String
});

userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
    var first = _stringUtil.StringUtil.capitalize(this.first.toLowerCase());
    var last = _stringUtil.StringUtil.capitalize(this.last.toLowerCase());
    return first + ' ' + last;
});

userSchema.statics.passwordMatches = function (password, hash) {
    return _bcryptjs2.default.compareSync(password, hash);
};

userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase();
    this.first = this.first.toLowerCase();
    this.last = this.last.toLowerCase();
    var unsafePassword = this.password;
    var salt = _bcryptjs2.default.genSaltSync(10);
    this.password = _bcryptjs2.default.hashSync(unsafePassword, salt);

    next();
});

exports.default = _mongoose2.default.model('user', userSchema);