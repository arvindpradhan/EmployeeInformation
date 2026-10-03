const Joi = require("joi");
const createEmployeeSchema = Joi.object({

  firstName: Joi.string().trim().min(3).max(30).required(),
  lastName: Joi.string().trim().max(30),
  email: Joi.string().email().required(),
  salary: Joi.number().min(0).max(50000000).required(),
  department: Joi.string().trim().min(1).required(),
  designation: Joi.string().trim().min(1).required(),
  status: Joi.string().valid("active", "inactive")

}).unknown(false);

const updateEmployeeSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  lastName: Joi.string()
    .trim()
    .max(30)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required(),

  salary: Joi.number()
    .min(0)
    .max(50000000)
    .required(),

  department: Joi.string()
    .trim()
    .min(1)
    .required(),

  designation: Joi.string()
    .trim()
    .min(1)
    .required(),

  status: Joi.string()
    .valid("active", "inactive")
    .required()

}).unknown(false);

const patchEmployeeSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(3)
    .max(30),

  lastName: Joi.string()
    .trim()
    .max(30),

  email: Joi.string()
    .trim()
    .email(),

  salary: Joi.number()
    .min(0)
    .max(50000000),

  department: Joi.string()
    .trim()
    .min(1),

  designation: Joi.string()
    .trim()
    .min(1),

  status: Joi.string()
    .valid("active", "inactive")
}).min(1).unknown(false);

const validateEmployee = (mode) => {
  return (req, res, next) => {
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   salary,
    //   department,
    //   designation,
    //   status
    // } = req.body;

    const schemas = {
      create: createEmployeeSchema,
      update: updateEmployeeSchema,
      patch: patchEmployeeSchema
    };

    const schema = schemas[mode];

    // Invalid mode protection
    if (!schema) {
      return res.status(500).json({
        success: false,
        message: "Invalid validation mode"
      });
    }
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        messages: error.details.map((detail) => detail.message)
      });
    }

    req.body = value;
    next();

    // if (mode === "create" && (!firstName || firstName.trim() === "")) {
    //   return res.status(400).json({
    //     message: "First name is required"
    //   });
    // }
    // if (mode === "create" && (!lastName || lastName.trim() === "")) {
    //   return res.status(400).json({
    //     message: "Last name is required"
    //   });
    // }
    // if (mode === "create" && !email) {
    //   return res.status(400).json({
    //     message: "Email is required"
    //   });
    // }
    // if (email) {
    //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //   if (!emailPattern.test(email)) {
    //     return res.status(400).json({
    //       message: "Invalid email format"
    //     });
    //   }
    // }

    // if (mode === "create" && (salary === undefined || salary === null)) {
    //   return res.status(400).json({
    //     message: "Salary is required"
    //   });
    // }
    // if (salary !== undefined && typeof salary !== "number") {
    //   return res.status(400).json({
    //     message: "Salary must be a number"
    //   });
    // }
    // if (salary !== undefined && (salary > 50000000 || salary < 0)) {
    //   return res.status(400).json({
    //     message: "Salary exceeds the range of 0 to 50,000,000 "
    //   });
    // }
    // if (mode === "create" && (!department || department.trim() === "")) {
    //   return res.status(400).json({
    //     message: "Department is required"
    //   });
    // }
    // if (mode === "create" && (!designation || designation.trim() === "")) {
    //   return res.status(400).json({
    //     message: "Designation is required"
    //   });
    // }
    // if (designation !== undefined && designation.trim() === "") {
    //   return res.status(400).json({
    //     message: "Designation cannot be empty"
    //   });
    // }
    // if (status !== undefined) {
    //   if (typeof status !== "string" || status.trim() === "") {
    //     return res.status(400).json({
    //       message: "Status cannot be empty"
    //     });
    //   }

    //   if (!["active", "inactive"].includes(status)) {
    //     return res.status(400).json({
    //       message: "Status must be active or inactive"
    //     });
    //   }
    // }

  };
};
module.exports = validateEmployee;