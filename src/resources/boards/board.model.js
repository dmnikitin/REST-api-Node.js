const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: false },
  columns: { type: Array, required: false }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
