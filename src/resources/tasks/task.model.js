const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'default task',
    order = 0,
    description = 'default description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Board;
