const router = require('express').Router({ mergeParams: true });
const uuid = require('uuid');
const taskService = require('./task.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const validatorMiddleware = require('./../../middlewares/validator');
const ExtendedError = require('../../helpers/error-extended');
const Task = require('./task.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const boardId = req.params.id;
    const tasks = await taskService.getAll(boardId);
    if (!tasks) throw new ExtendedError(404, 'Bad request');
    res.json(tasks);
  })
);

router.route('/:taskId').get(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id, taskId } = req.params;
    const task = await taskService.getById(id, taskId);
    if (!task) throw new ExtendedError(404, 'Task not found');
    res.json(task);
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const { title, order, description, userId, columnId } = req.body;
    const { id: boardId } = req.params;
    const task = new Task({
      id: uuid(),
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    if (!task) throw new ExtendedError(400, 'Bad request');
    const result = await taskService.addTask(task, boardId);
    res.json(result);
  })
);

router.route('/:id').put(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const {
      body: update,
      params: { id }
    } = req;
    const result = await taskService.updateTask(id, update);
    if (!result) throw new ExtendedError(400, 'Bad request');
    res.json(result);
  })
);

router.route('/:id').delete(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const isSuccess = await taskService.deleteTask(id);
    if (!isSuccess) throw new ExtendedError(404, 'Task not found');
    res.status(204).send('Task was deleted successfully');
  })
);

module.exports = router;
