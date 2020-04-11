const router = require('express').Router();
const boardService = require('./board.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');
const Board = require('./board.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const boards = await boardService.getAll();
    res.json(boards);
  })
);

router.route('/:id').get(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const board = await boardService.getById(id);
    if (board) res.json(board);
    throw new ExtendedError(404, 'Board not found');
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const board = new Board(req.body);
    if (board) {
      const result = await boardService.addBoard(board);
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
    const result = await boardService.updateBoard(id, update);
    if (result) res.json(result);
    throw new ExtendedError(400, 'Bad request');
  })
);

router.route('/:id').delete(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const isSuccess = await boardService.deleteBoard(id);
    if (isSuccess) res.status(204).send('Board was deleted successfully');
    throw new ExtendedError(404, 'Board not found');
  })
);

module.exports = router;
