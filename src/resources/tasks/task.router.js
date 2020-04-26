const router = require('express').Router({ mergeParams: true });
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
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:taskId').get(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id: boardId, taskId } = req.params;
    const task = await taskService.getById(boardId, taskId);
    if (!task) throw new ExtendedError(404, 'Task not found');
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const task = await taskService.addTask(
      Object.assign({}, req.body, { boardId: req.params.id })
    );
    if (!task) throw new ExtendedError(400, 'Bad request');
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const {
      body: update,
      params: { id }
    } = req;
    const task = await taskService.updateTask(id, update);
    if (!task) throw new ExtendedError(400, 'Bad request');
    res.json(task);
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
