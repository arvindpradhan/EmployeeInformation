const userService = require("../services/userService");


const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await userService.checkUserEmail(email);

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newUser = await userService.registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    // Login logic will come here
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
