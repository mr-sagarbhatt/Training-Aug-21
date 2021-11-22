const Joi = require("joi");

// * VALIDATE USER
function validateUser(user) {
  const joiSchema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return joiSchema.validate(user);
}
// * VALIDATE USER LOGIN
function validateUserLogin(user) {
  const joiSchema = Joi.object({
    user: Joi.required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return joiSchema.validate(user);
}

module.exports = { validateUser, validateUserLogin };
