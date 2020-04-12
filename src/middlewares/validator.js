const ExtendedError = require('../helpers/error-extended');
const validator = (req, res, next) => {
  const idRegexp = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g;
  const validId = idRegexp.test(req.params.id);
  if (!validId) throw new ExtendedError(400, 'Incorrect request format');
  next();
};

module.exports = validator;
