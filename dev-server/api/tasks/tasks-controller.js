export function index(req, res) {
    // FInd all tasks
    res.status(200).json()
}

export function create(req, res) {
    // Create a tasks
    res.status(201).json()
}

export function update(req, res) {
    // Update a tasks
    res.status(204).json()
}

export function remove(req, res) {
    // Delete a tasks
    res.status(204).json()
}

export function show(req, res) {
    // Show a tasks by id
    res.status(200).json()
}