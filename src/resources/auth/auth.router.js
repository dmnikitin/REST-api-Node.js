const router = require('express').Router();
const catchErrorsDecorator = require('../../helpers/error-decorator');
const ExtendedError = require('../../helpers/error-extended');
const authService = require('./auth.service');
const bcrypt = require('bcrypt');

router.route('/').post(
  catchErrorsDecorator(async (req, res) => {
    const { login, password } = req.body;
    const user = await authService.checkRegistration(login);
    if (!user) {
      throw new ExtendedError(403, 'Access forbidden, user not registered');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ExtendedError(403, 'Access forbidden, invalid password');
    }
    const token = authService.createToken(login, user._id);
    res.header('Authorization', `Bearer ${token}`).send({ token });
  })
);

module.exports = router;
