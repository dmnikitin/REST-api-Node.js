// const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = boardId => Task.find({ boardId });
const getById = (boardId, id) => Task.findOne({ boardId, id });
const addTask = task => task.save();
const updateTask = (id, update) => Task.findOneAndUpdate({ id }, update);
const deleteTask = id => Task.findOneAndDelete({ id });

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
