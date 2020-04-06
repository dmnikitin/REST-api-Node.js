const { findIndexById, findElementById } = require('../../helpers/index');
const mockUsersArray = [];

const getAll = async () => mockUsersArray;
const getUserById = async id => findElementById(mockUsersArray, id);
const addUser = async user => {
  mockUsersArray.push(user);
  return mockUsersArray[mockUsersArray.length - 1];
};
const updateUser = async (id, update) => {
  const index = findIndexById(mockUsersArray, id);
  if (index !== -1) {
    const updatedElement = Object.assign({}, mockUsersArray[index], update);
    mockUsersArray.splice(index, 1, updatedElement);
    return mockUsersArray[index];
  }
  throw new Error();
};
const deleteUser = async id => {
  const index = findIndexById(mockUsersArray, id);
  if (index !== -1) {
    mockUsersArray.splice(index, 1);
  } else {
    throw new Error();
  }
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
