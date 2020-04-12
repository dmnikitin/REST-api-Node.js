const { findIndexById, findElementById } = require('../../helpers/index');

const mockTasksArray = [];

const getAll = boardId => {
  if (boardId) {
    return mockTasksArray.filter(el => {
      if (el.boardId === boardId) return el;
    });
  }
  return mockTasksArray;
};

const getById = (bd, id) => {
  const x = findElementById(mockTasksArray, id);
  if (x) {
    return x;
  }
  throw new Error();
};

const addTask = task => {
  mockTasksArray.push(task);
  return mockTasksArray[mockTasksArray.length - 1];
};

const updateTask = (id, update) => {
  const index = findIndexById(mockTasksArray, id);
  if (index !== -1) {
    const updatedElement = Object.assign({}, mockTasksArray[index], update);
    mockTasksArray.splice(index, 1, updatedElement);
    return mockTasksArray[index];
  }
  throw new Error();
};
const deleteTask = id => {
  try {
    const index = findIndexById(mockTasksArray, id);
    if (index !== -1) {
      mockTasksArray.splice(index, 1);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
