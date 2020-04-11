const router = require('express').Router();
const usersService = require('./user.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const validator = require('./../../helpers/validator');
const ExtendedError = require('../../helpers/error-extended');
const User = require('./user.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    if (validator(id)) {
      const user = await usersService.getUserById(id);
      if (user) res.json(User.toResponse(user));
      throw new ExtendedError(404, 'User not found');
    }
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const user = new User(req.body);
    if (user) {
      const result = await usersService.addUser(user);
      res.json(User.toResponse(result));
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
    if (validator(id)) {
      const result = await usersService.updateUser(id, update);
      if (result) res.json(User.toResponse(result));
      throw new ExtendedError(400, 'Bad request');
    }
  })
);

router.route('/:id').delete(
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    if (validator(id)) {
      const isSuccess = await usersService.deleteUser(id);
      if (isSuccess) res.status(204).send('User was deleted successfully');
      throw new ExtendedError(404, 'user not found');
    }
  })
);

module.exports = router;
