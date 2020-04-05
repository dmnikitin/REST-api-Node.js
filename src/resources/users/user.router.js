const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  console.log('user', user);
  try {
    const result = await usersService.addUser(user);
    res.json(User.toResponse(result));
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
    const result = await usersService.updateUser(id, update);
    res.json(User.toResponse(result));
  } catch (err) {
    res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    await usersService.deleteUser(id);
    res.status(204).send('User was deleted successfully');
  } catch (err) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
