const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');
const Task = require('./task.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const boardId = req.params.id;
    const tasks = await taskService.getAll(boardId);
    if (tasks) res.json(tasks);
    throw new ExtendedError(404, 'Bad request');
  })
);

router.route('/:taskId').get(
  catchErrorsDecorator(async (req, res) => {
    const { id, taskId } = req.params;
    const task = await taskService.getById(id, taskId);
    if (task) res.json(task);
    throw new ExtendedError(404, 'Task not found');
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const boardId = req.params.id;
    const task = new Task(req.body);
    if (task) {
      task.boardId = boardId;
      const result = await taskService.addTask(task, boardId);
      res.json(result);
    }
    throw new ExtendedError(400, 'Bad request');
  })
);

router.route('/:id').put(
  catchErrorsDecorator(async (req, res) => {
    const {
      body: update,
      params: { id }
    } = req;
    const result = await taskService.updateTask(id, update);
    if (result) res.json(result);
    throw new ExtendedError(400, 'Bad request');
  })
);

router.route('/:id').delete(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const isSuccess = await taskService.deleteTask(id);
    if (isSuccess) res.status(204).send('Task deleted successfully');
    throw new ExtendedError(404, 'Task not found');
  })
);

module.exports = router;
