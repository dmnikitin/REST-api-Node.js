const User = require('./user.model');
const mockUsersArray = Array.from({ length: 3 }, () => new User());

// check for arr length

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
