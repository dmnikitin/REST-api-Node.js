const User = require('./user.model');
const mockUsersArray = Array.from({ length: 3 }, () => new User());

// check for arr length

const getAll = async () => mockUsersArray;
const getUserById = async id => findElementById(mockUsersArray, id);
const addUser = async user => mockUsersArray.push(user);
const updateUser = async (id, update) => {
  const index = findIndexById(mockUsersArray, id);
  const updatedElement = Object.assign({}, mockUsersArray[index], update);
  mockUsersArray.splice(index, 1, updatedElement);
  return mockUsersArray[index];
};
const deleteUser = async id => {
  const index = findIndexById(mockUsersArray, id);
  return mockUsersArray.splice(index, 1);
};

const findIndexById = (arr, id) => {
  return arr.findIndex(el => {
    if (el.id === id) return el;
  });
};

const findElementById = (arr, id) => {
  return arr.find(el => {
    if (el.id === id) return el;
  });
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
