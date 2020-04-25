const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: false },
    order: { type: Number, required: false },
    description: { type: String, required: false },
    userId: { type: String, required: false },
    boardId: { type: String, required: true },
    columnId: { type: String, required: false }
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
