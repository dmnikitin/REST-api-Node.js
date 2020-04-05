const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const getTaskById = id => tasksRepo.getTaskById(id);
const addTask = task => tasksRepo.addTask(task);
const updateTask = (id, update) => tasksRepo.updateTask(id, update);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = { getAll, getTaskById, addTask, updateTask, deleteTask };
