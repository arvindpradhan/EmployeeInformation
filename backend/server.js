const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
// const Employee = require("./models/Employee");
const employeeRoutes = require("./routes/employeeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
// Error handling middleware
app.use(errorMiddleware); 

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connected successfully");

    return sequelize.sync();
  })
  .then(() => {
    console.log("Database tables synchronized");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  })
