const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: false },
    order: { type: Number, required: false }
  },
  { versionKey: false }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
