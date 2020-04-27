const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = () => User.find({});

const getUserById = id => User.findOne({ id });

const addUser = user => user.save();

const updateUser = (id, update) => User.findOneAndUpdate({ id }, update);

const deleteUser = async id => {
  const isSuccess = await User.findOneAndDelete({ id });
  if (isSuccess) {
    await Task.updateMany({ userId: id }, { userId: null });
  }
  return isSuccess;
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
