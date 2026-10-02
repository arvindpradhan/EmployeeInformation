const express = require('express');
const validateEmployee = require('../middleware/validateEmployee');
const employeeController = require("../controllers/employeeController");
const validateEmployeeQuery = require('../middleware/validateEmployeeQuery');

const router = express.Router();

router.get(
  '/',
  validateEmployeeQuery,
  employeeController.getEmployees
);

router.get('/:id', employeeController.getEmployeeById);

router.post(
  '/',
  validateEmployee("create"),
  employeeController.createEmployee
);

router.put(
  '/:id',
  validateEmployee("update"),
  employeeController.updateEmployee
);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;