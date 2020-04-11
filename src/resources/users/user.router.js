const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const ExtendedError = require('../../helpers/error-extended');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (user) res.json(User.toResponse(user));
    throw new ExtendedError(404, 'User not found');
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = new User(req.body);
    if (user) {
      const result = await usersService.addUser(user);
      res.json(User.toResponse(result));
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
    const result = await usersService.updateUser(id, update);
    if (result) res.json(User.toResponse(result));
    throw new ExtendedError(400, 'Bad request');
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const isSuccess = await usersService.deleteUser(id);
    if (isSuccess) res.status(204).send('User was deleted successfully');
    throw new ExtendedError(404, 'user not found');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
