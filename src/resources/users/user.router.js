const router = require('express').Router();
const usersService = require('./user.service');
const validatorMiddleware = require('../../middlewares/validator');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');
const User = require('./user.model');

router.route('/').get(
  catchErrorsDecorator(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (!user) throw new ExtendedError(404, 'User not found');
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const user = await usersService.addUser(req.body);
    console.log('user', user);
    if (!user) throw new ExtendedError(400, 'Bad request');
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const {
      body: update,
      params: { id }
    } = req;
    const result = await usersService.updateUser(id, update);
    if (!result) throw new ExtendedError(400, 'Bad request');
    res.json(User.toResponse(result));
  })
);

router.route('/:id').delete(
  validatorMiddleware,
  catchErrorsDecorator(async (req, res) => {
    const { id } = req.params;
    const isSuccess = await usersService.deleteUser(id);
    if (!isSuccess) throw new ExtendedError(404, 'User not found');
    res.status(204).send('User was deleted successfully');
  })
);

module.exports = router;
