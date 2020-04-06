const { findIndexById, findElementById } = require('../../helpers/index');
const mockUsersArray = [];

const getAll = () => mockUsersArray;

const getUserById = id => {
  const x = findElementById(mockUsersArray, id);
  if (x) {
    return x;
  }
  throw new Error();
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
  throw new Error();
};
const deleteUser = id => {
  const index = findIndexById(mockUsersArray, id);
  if (index !== -1) {
    mockUsersArray.splice(index, 1);
  } else {
    throw new Error();
  }
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
