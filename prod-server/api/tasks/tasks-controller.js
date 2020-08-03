"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;
function index(req, res) {
    // FInd all tasks
    res.status(200).json();
}

function create(req, res) {
    // Create a tasks
    res.status(201).json();
}

function update(req, res) {
    // Update a tasks
    res.status(204).json();
}

function remove(req, res) {
    // Delete a tasks
    res.status(204).json();
}

function show(req, res) {
    // Show a tasks by id
    res.status(200).json();
}