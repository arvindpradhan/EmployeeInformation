const Employee = require('../models/Employee');
const { Op } = require("sequelize");

const getAllEmployees = async ({
  page = 1,
  limit = 10,
  search,
  sortBy = "sequence",
  sortOrder = "ASC",
  department,
  status
}) => {

  page = Number(page);
  limit = Number(limit);
  const offset = (page - 1) * limit;

 const where = {};

if (search) {
  where[Op.or] = [
    { firstName: { [Op.like]: `%${search}%` } },
    { lastName: { [Op.like]: `%${search}%` } },
    { email: { [Op.like]: `%${search}%` } },
    { department: { [Op.like]: `%${search}%` } },
    { designation: { [Op.like]: `%${search}%` } }
  ];
}

if (department) {
  where.department = department;
}

if (status) {
  where.status = status;
}

  const result = await Employee.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
  });

  return {
    data: result.rows,
    pagination: {
      page,
      limit,
      totalRecords: result.count,
      totalPages: Math.ceil(result.count / limit),
    },
  };
};



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