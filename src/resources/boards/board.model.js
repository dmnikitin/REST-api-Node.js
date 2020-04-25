const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: false },
    columns: { type: Array, required: false }
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
