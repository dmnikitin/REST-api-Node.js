const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const board = await boardService.getBoardById(id);
    res.json(board);
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);
  try {
    const result = await boardService.addBoard(board);
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
    const result = await boardService.updateBoard(id, update);
    res.json(result);
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    await boardService.deleteBoard(id);
    res.status(204).send('Board was deleted successfully');
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
