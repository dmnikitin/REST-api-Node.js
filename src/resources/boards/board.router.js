const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const ExtendedError = require('../../helpers/error-extended');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardService.getById(id);
    if (board) res.json(board);
    throw new ExtendedError(404, 'Board not found');
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = new Board(req.body);
    if (board) {
      const result = await boardService.addBoard(board);
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
    const result = await boardService.updateBoard(id, update);
    if (result) res.json(result);
    throw new ExtendedError(400, 'Bad request');
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const isSuccess = await boardService.deleteBoard(id);
    if (isSuccess) res.status(204).send('Board was deleted successfully');
    throw new ExtendedError(404, 'Board not found');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
