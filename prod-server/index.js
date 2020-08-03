'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _env = require('./config/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 5100;
var hostname = '127.0.0.1';

(0, _env.setEnvironment)(app);
(0, _routes.registerRoutes)(app);

app.get('/', function (req, res) {
    if (process.env.NODE_ENV !== 'production') {
        return res.send('Running server in development mode.');
    } else {
        return res.sendFile('index.html', { root: __dirname + '/../dist/' });
    }
});

app.listen(port, function () {
    console.log('Mevn Stack app listening at http://' + hostname + ':' + port + ' in ' + process.env.NODE_ENV);
});