const Task = require('./task.model');

const getAll = boardId => Task.find({ boardId });
const getById = (boardId, id) => Task.findOne({ boardId, _id: id });
const addTask = task => task.save();
const updateTask = (id, update) => Task.updateOne({ _id: id }, update);
const deleteTask = id => Task.deleteOne({ id });

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
