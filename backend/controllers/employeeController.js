const employeeService = require('../services/employeeService');

const getEmployees = async (req, res,next) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json({
      "success": true,
      "message": "Employees fetched successfully",
      data: employees
    });
  } catch (error) {
    
    next(error); // Pass the error to the error handling middleware
  }
}
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(
      req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      "success": true,
      "message": "Employee fetched successfully",
      data: employee
    });

  } catch (error) {
    next(error);
  }
}

const createEmployee = async (req, res, next) => {
  try {
    

    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      "success": true,
      "message": "Employee created successfully",
      data: employee
    });

  } catch (error) {
    // res.status(500).json({
    //   message: "Failed to create employee",
    //   error: error.message,
    // });
    next(error); // Pass the error to the error handling middleware
  }
}

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }
    res.status(200).json({
      "success": true,
      "message": "Employee updated successfully",
      data: employee
    });

  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
}

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(
      req.params.id
    );
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }
    res.status(200).json({
      "success": true,
      "message": "Employee deleted successfully",
      data: employee
    });
  } catch (error) {
   
    next(error); // Pass the error to the error handling middleware
  }
}

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}