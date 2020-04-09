const { findIndexById, findElementById } = require('../../helpers/find');
const mockBoardsArray = [];

const getAll = () => mockBoardsArray;

const getById = id => {
  const x = findElementById(mockBoardsArray, id);
  if (x) {
    return x;
  }
  throw new Error();
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
  throw new Error();
};
const deleteBoard = async id => {
  const index = findIndexById(mockBoardsArray, id);
  if (index !== -1) {
    mockBoardsArray.splice(index, 1);
  } else {
    throw new Error();
  }
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
