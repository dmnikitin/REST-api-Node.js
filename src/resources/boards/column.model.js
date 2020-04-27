const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: false },
  order: { type: Number, required: false }
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
