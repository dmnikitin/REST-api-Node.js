const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = () => Board.find({});

const getById = id => Board.findById(id);

const addBoard = board => Board.create(board);

const updateBoard = (id, update) => Board.updateOne({ _id: id }, update);

const deleteBoard = async id => {
  const isSuccess = await Board.findByIdAndDelete(id);
  if (isSuccess) {
    await Task.deleteMany({ boardId: id });
  }
  return isSuccess;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
