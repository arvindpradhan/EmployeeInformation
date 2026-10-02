const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    department: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "employees",
    timestamps: true,
  }
);

module.exports = Employee;