const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = () => User.find({});

const getUserById = id => User.findOne({ _id: id });

const addUser = user => User.create(user);

const updateUser = (id, update) => User.updateOne({ _id: id }, update);

const deleteUser = async id => {
  const isSuccess = await User.findByIdAndDelete(id);
  if (isSuccess) {
    await Task.updateMany({ userId: id }, { userId: null });
  }
  return isSuccess;
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
