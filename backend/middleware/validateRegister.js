
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),

  email: Joi.string().trim().email().max(100).required(),

  password: Joi.string().min(8).max(50).required(),
}).unknown(false);

const validateRegister = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;

  next();
};

module.exports = validateRegister;
