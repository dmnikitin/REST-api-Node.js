const uuid = require('uuid');
const Board = require('./board.model');
const mockBoardsArray = Array.from({ length: 3 }, () => new Board());

// check for arr length

const getAll = async () => mockBoardsArray;
const getBoardById = async id => findElementById(mockBoardsArray, id);
const addBoard = async board => {
  if (board.columns && board.columns.length) {
    board.columns.forEach(column => {
      if (!column.id) {
        column.id = uuid();
      }
    });
  }
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

module.exports = { getAll, getBoardById, addBoard, updateBoard, deleteBoard };
