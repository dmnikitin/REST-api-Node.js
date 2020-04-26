const router = require('express').Router();
const boardService = require('./board.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const validatorMiddleware = require('./../../middlewares/validator');
const ExtendedError = require('../../helpers/error-extended');
const Board = require('./board.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const board = await boardService.getById(id);
    if (!board) throw new ExtendedError(404, 'Board not found');
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const board = await boardService.addBoard(req.body);
    if (!board) throw new ExtendedError(400, 'Bad request');
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const {
      body: update,
      params: { id }
    } = req;
    const board = await boardService.updateBoard(id, update);
    if (!board) throw new ExtendedError(400, 'Bad request');
    res.json(board);
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
