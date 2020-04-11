const ExtendedError = require('./error-extended');

const validator = id => {
  const idReg = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g;
  if (idReg.test(id)) return true;
  throw new ExtendedError(400, 'incorrect request format');
};

module.exports = validator;
