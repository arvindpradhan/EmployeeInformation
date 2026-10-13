const User = require("../models/User");

// Find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  createUser,
};