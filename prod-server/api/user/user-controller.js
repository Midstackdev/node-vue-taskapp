'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
function index(req, res) {
    return res.staus(200).json({ message: 'Hello world' });
}