const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const boardId = req.baseUrl.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g)[0];
    const tasks = await taskService.getAll(boardId);
    res.json(tasks);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardId = req.baseUrl.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g)[0];
    const task = new Task(req.body, boardId);
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
