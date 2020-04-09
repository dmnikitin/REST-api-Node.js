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

module.exports = { findIndexById, findElementById };
