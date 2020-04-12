const router = require('express').Router();
const boardService = require('./board.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const validatorMiddleware = require('./../../middlewares/validator');
const ExtendedError = require('../../helpers/error-extended');
const Board = require('./board.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);
    if (!board) throw new ExtendedError(404, 'Board not found');
    res.json(board);
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const board = new Board(req.body);
    if (!board) throw new ExtendedError(400, 'Bad request');
    const result = await boardService.addBoard(board);
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
    const result = await boardService.updateBoard(id, update);
    if (!result) throw new ExtendedError(400, 'Bad request');
    res.json(result);
  })
);

router.route('/:id').delete(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const isSuccess = await boardService.deleteBoard(id);
    if (!isSuccess) throw new ExtendedError(404, 'Board not found');
    res.status(204).send('Board was deleted successfully');
  })
);

module.exports = router;
