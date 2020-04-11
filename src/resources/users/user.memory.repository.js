const { findIndexById, findElementById } = require('../../helpers/find');
const mockUsersArray = [];

const getAll = () => mockUsersArray;

const getUserById = id => {
  const x = findElementById(mockUsersArray, id);
  return x ? x : null;
};

const addUser = user => {
  mockUsersArray.push(user);
  return mockUsersArray[mockUsersArray.length - 1];
};

const updateUser = (id, update) => {
  const index = findIndexById(mockUsersArray, id);
  if (index !== -1) {
    const updatedElement = Object.assign({}, mockUsersArray[index], update);
    mockUsersArray.splice(index, 1, updatedElement);
    return mockUsersArray[index];
  }
  return false;
};

const deleteUser = id => {
  const index = findIndexById(mockUsersArray, id);
  if (index !== -1) {
    mockUsersArray.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
