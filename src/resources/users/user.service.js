const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const addUser = user => usersRepo.addUser(user);
const updateUser = (id, update) => usersRepo.updateUser(id, update);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
