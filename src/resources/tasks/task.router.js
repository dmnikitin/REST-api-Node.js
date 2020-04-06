const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const boardId = req.params.id;
    const tasks = await taskService.getAll(boardId);
    res.json(tasks);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const task = await taskService.getById(id, taskId);
    res.json(task);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardId = req.params.id;
    const task = new Task(req.body);
    task.boardId = boardId;
    const result = await taskService.addTask(task, boardId);
    res.json(result);
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').put(async (req, res) => {
  const {
    body: update,
    params: { id }
  } = req;
  try {
    const result = await taskService.updateTask(id, update);
    res.json(result);
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    await taskService.deleteTask(id);
    res.status(204).send('Task was deleted successfully');
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
