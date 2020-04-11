const { findIndexById, findElementById } = require('../../helpers/find');

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
  const element = findElementById(mockTasksArray, id);
  return element ? element : null;
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
  return false;
};

const deleteTask = id => {
  const index = findIndexById(mockTasksArray, id);
  if (index !== -1 && mockTasksArray.length) {
    mockTasksArray.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
