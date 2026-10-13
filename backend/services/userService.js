
const bcrypt = require("bcrypt");
const userQueries = require("../queries/userQueries");

// Check whether email already exists
const checkUserEmail = async (email) => {
  const existingUser = await userQueries.findUserByEmail(email);

  return Boolean(existingUser);
};

// Register new user
const registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await userQueries.createUser({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  return newUser;
};

module.exports = {
  checkUserEmail,
  registerUser,
};
