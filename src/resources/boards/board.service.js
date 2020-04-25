const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = () => Board.find({});

const getById = id => Board.findOne({ _id: id });

const updateBoard = (id, update) => Board.updateOne({ _id: id }, update);

const addBoard = board => board.save();

const deleteBoard = async id => {
  const isSuccess = await Board.deleteOne({ id });
  if (isSuccess) {
    await Task.deleteMany({ boardId: id });
  }
  return isSuccess;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
