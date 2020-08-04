'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectToDB = connectToDB;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectToDB() {
    _mongoose2.default.connect('' + process.env.DB_URL + process.env.DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(function () {
        console.log('DB Connected');
    }).catch(function (error) {
        console.log('Unable to connect to DB');
        throw error;
    });
}