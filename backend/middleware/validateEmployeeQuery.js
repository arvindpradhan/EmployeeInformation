const Joi = require("joi");

const employeeQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

  search: Joi.string()
    .trim()
    .allow(""),
    
  sortBy: Joi.string()
    .valid(
      "firstName",
      "lastName",
      "email",
      "salary",
      "department",
      "designation",
      "status",
      "sequence"
    )
    .default("sequence"),

  sortOrder: Joi.string()
    .valid("ASC", "DESC")
    .default("ASC")
});

const validateEmployeeQuery = (req, res, next) => {
  const { error, value } = employeeQuerySchema.validate(req.query, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      messages: error.details.map((detail) => detail.message)
    });
  }

  req.query = value;
  next();
};

module.exports = validateEmployeeQuery;