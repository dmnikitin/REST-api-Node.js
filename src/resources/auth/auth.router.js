const router = require('express').Router();
const authService = require('./auth.service');
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const { login, password } = req.body;
    const user = await authService.checkRegistration(login);
    if (!user) throw new ExtendedError(403, 'Access forbidden');
    const isPasswordValid = await authService.checkPassword(
      password,
      user.password
    );
    if (!isPasswordValid) throw new ExtendedError(403, 'Access forbidden');
    const token = authService.createToken(login, user._id);
    res.header('Authorization', `Bearer ${token}`).send({ token });
  })
);

module.exports = router;
