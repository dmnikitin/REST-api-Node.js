const { findIndexById, findElementById } = require('../../helpers/find');
const mockBoardsArray = [];

const getAll = () => mockBoardsArray;

const getById = id => {
  const element = findElementById(mockBoardsArray, id);
  return element ? element : null;
};

const addBoard = async board => {
  mockBoardsArray.push(board);
  return mockBoardsArray[mockBoardsArray.length - 1];
};

const updateBoard = async (id, update) => {
  const index = findIndexById(mockBoardsArray, id);
  if (index !== -1) {
    const updatedElement = Object.assign({}, mockBoardsArray[index], update);
    mockBoardsArray.splice(index, 1, updatedElement);
    return mockBoardsArray[index];
  }
  return false;
};

const deleteBoard = async id => {
  const index = findIndexById(mockBoardsArray, id);
  if (index !== -1) {
    mockBoardsArray.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
