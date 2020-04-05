const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'default board',
    columns = ['column 1', 'column 2']
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
