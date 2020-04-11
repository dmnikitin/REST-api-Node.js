const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const ExtendedError = require('../../helpers/error-extended');

router.route('/').get(async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const tasks = await taskService.getAll(boardId);
    if (tasks) res.json(tasks);
    throw new ExtendedError(404, 'Bad request');
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const { id, taskId } = req.params;
    const task = await taskService.getById(id, taskId);
    console.log('task', task);
    if (task) res.json(task);
    throw new ExtendedError(404, 'Task not found');
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const task = new Task(req.body);
    if (task) {
      task.boardId = boardId;
      const result = await taskService.addTask(task, boardId);
      res.json(result);
    }
    throw new ExtendedError(400, 'Bad request');
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const {
      body: update,
      params: { id }
    } = req;
    const result = await taskService.updateTask(id, update);
    if (result) res.json(result);
    throw new ExtendedError(400, 'Bad request');
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const isSuccess = await taskService.deleteTask(id);
    if (isSuccess) res.status(204).end();
    throw new ExtendedError(404, 'Task not found');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
