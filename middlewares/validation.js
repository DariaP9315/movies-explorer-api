const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const BadRequestError = require('../errors/bad-request-err'); // 400
const { errorMessages } = require('../utils/constants');

const methodValidation = (value) => {
  const method = validator.isURL(value);
  if (!method) {
    return new BadRequestError(errorMessages.incorrectData);
  }
  return value;
};

const validateMovieSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(methodValidation, 'validation link'),
    trailer: Joi.string().required().custom(methodValidation, 'validation link'),
    thumbnail: Joi.string().required().custom(methodValidation, 'validation link'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const validateUserSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateMovieSchema,
  validateMovieId,
  validateUserSchema,
  validateUserLogin,
  validateUserUpdate,
};
