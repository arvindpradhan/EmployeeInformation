const Employee = require('../models/Employee');

const getAllEmployees = async () => {
  return await Employee.findAll();
}
const getEmployeeById = async (id) => {
  return await Employee.findByPk(id);
}

const createEmployee = async (employeeData) => {
  return await Employee.create(employeeData);
}

const updateEmployee = async (id, employeeData) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    return null;
  }
  return await employee.update(employeeData);
}

const deleteEmployee = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    return null;
  }
  await employee.destroy();
  return employee;
}

const getLastSequence = async () => {
  return await Employee.findOne({
    order: [["sequence", "DESC"]],
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getLastSequence,
};