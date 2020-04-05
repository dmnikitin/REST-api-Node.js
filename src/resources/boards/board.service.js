const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getUserById = id => boardsRepo.getUserById(id);
const addUser = user => boardsRepo.addUser(user);
const updateUser = (id, update) => boardsRepo.updateUser(id, update);
const deleteUser = id => boardsRepo.deleteUser(id);

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
