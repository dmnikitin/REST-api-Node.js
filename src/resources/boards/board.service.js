const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = () => Board.find({});

const getById = id => Board.findOne({ id });

const updateBoard = (id, update) => Board.findOneAndUpdate({ id }, update);

const addBoard = board => board.save();

const deleteBoard = async id => {
  const isSuccess = await Board.findOneAndDelete({ id });
  if (isSuccess) {
    await Task.deleteMany({ boardId: id });
  }
  return isSuccess;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
