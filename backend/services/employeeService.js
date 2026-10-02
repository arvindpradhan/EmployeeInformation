const employeeQueries = require('../queries/employeeQueries');

const getEmployees = async ({ page, limit, search }) => {
  return await employeeQueries.getAllEmployees({
    page,
    limit,
    search
  });
};
const getEmployeeById = async (id) => {
  return await employeeQueries.getEmployeeById(id);
}

const createEmployee = async (employeeData) => {

  const lastEmployee = await employeeQueries.getLastSequence();

  const nextSequence = lastEmployee
    ? lastEmployee.sequence + 1
    : 1;

  const namePart = employeeData.firstName
    .substring(0, 3)
    .toUpperCase();

  const yearPart = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  const sequencePart = nextSequence
    .toString()
    .padStart(3, "0");

  const employeeId = `${namePart}${yearPart}${sequencePart}`;

  return await employeeQueries.createEmployee({
    ...employeeData,
    id: employeeId,
    sequence: nextSequence,
  });
}

const updateEmployee = async (id, employeeData) => {
  return await employeeQueries.updateEmployee(id, employeeData);
}

const deleteEmployee = async (id) => {
  return await employeeQueries.deleteEmployee(id);
}



module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}