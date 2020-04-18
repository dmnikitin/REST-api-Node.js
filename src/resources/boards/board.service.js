const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');
const uuid = require('uuid');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const updateBoard = (id, update) => boardsRepo.updateBoard(id, update);

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

const deleteBoard = async id => {
  const isSuccess = await boardsRepo.deleteBoard(id);
  if (isSuccess) {
    const boardTasks = await taskService.getAll(id);
    if (boardTasks && boardTasks.length) {
      await Promise.all(
        boardTasks.map(task => taskService.deleteTask(task.id))
      );
    }
  }
  return isSuccess;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
