const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: false },
  order: { type: Number, required: false },
  description: { type: String, required: false },
  userId: { type: String, required: false },
  boardId: { type: String, required: true },
  columnId: { type: String, required: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
