const validator = (req, res, next) => {
  try {
    const validId = req.params.id.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g)[0];
    if (validId) return next();
    throw new Error();
  } catch (err) {
    // next(err)
    res.status(400).send('incorrect request format');
  }
};

module.exports = validator;
