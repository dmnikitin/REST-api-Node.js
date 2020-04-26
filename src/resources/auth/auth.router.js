const router = require('express').Router();
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');
const authService = require('./auth.service');

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const { login, password } = req.body;
    const isUserRegistered = await authService.checkAuth(login);
    if (!isUserRegistered) {
      throw new ExtendedError(400, 'credentials not provided');
    }
    const token = authService.createToken(login, password);
    res.json({ token });
  })
);

module.exports = router;
