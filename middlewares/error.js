const { errorMessages } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? errorMessages.serverError : `Произошла ошибка: ${message}` });

  return next();
});
