const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');
const uuid = require('uuid');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const addBoard = board => {
  if (board.columns && board.columns.length) {
    board.columns.forEach(column => {
      if (!column.id) {
        column.id = uuid();
      }
    });
  }
  return boardsRepo.addBoard(board);
};
const updateBoard = (id, update) => boardsRepo.updateBoard(id, update);
const deleteBoard = async id => {
  try {
    const boardTasks = await taskService.getAll(id);
    if (boardTasks.length) {
      boardTasks.forEach(async task => {
        try {
          await taskService.deleteTask(task.id);
        } catch (err) {
          console.log(err);
        }
      });
    }
    return boardsRepo.deleteBoard(id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
