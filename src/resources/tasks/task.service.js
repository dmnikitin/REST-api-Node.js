const Task = require('./task.model');

const getAll = boardId => Task.find({ boardId });
const getById = (boardId, id) => Task.findOne({ boardId, _id: id });
const addTask = task => Task.create(task);
const updateTask = (id, update) => Task.updateOne({ _id: id }, update);
const deleteTask = id => Task.findByIdAndDelete(id);

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
