const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const addBoard = board => boardsRepo.addBoard(board);
const updateBoard = (id, update) => boardsRepo.updateBoard(id, update);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoardById, addBoard, updateBoard, deleteBoard };
