const { findIndexById, findElementById } = require('../../helpers/index');

const mockTasksArray = [];

const getAll = async boardId => {
  if (boardId) {
    return mockTasksArray.filter(el => {
      if (el.boardId === boardId) return el;
    });
  }
  return mockTasksArray;
};

const getTaskById = async id => findElementById(mockTasksArray, id);

const addTask = async task => {
  mockTasksArray.push(task);
  return mockTasksArray[mockTasksArray.length - 1];
};

const updateTask = async (id, update) => {
  const index = findIndexById(mockTasksArray, id);
  if (index !== -1) {
    const updatedElement = Object.assign({}, mockTasksArray[index], update);
    mockTasksArray.splice(index, 1, updatedElement);
    return mockTasksArray[index];
  }
  throw new Error();
};
const deleteTask = async id => {
  const index = findIndexById(mockTasksArray, id);
  if (index !== -1) {
    mockTasksArray.splice(index, 1);
  } else {
    throw new Error();
  }
};

module.exports = { getAll, getTaskById, addTask, updateTask, deleteTask };
