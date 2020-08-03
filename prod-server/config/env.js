'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setEnvironment = setEnvironment;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = _dotenv2.default.config();
// console.log(process.env)

function setEnvironment(app) {
    if (process.env.NODE_ENV !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    app.use(_bodyParser2.default.json());
    app.use((0, _morgan2.default)('dev'));
    app.use((0, _cors2.default)());
}

function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    app.use(_bodyParser2.default.json());
    app.use(_express2.default.static(__dirname + '/../dist'));
}