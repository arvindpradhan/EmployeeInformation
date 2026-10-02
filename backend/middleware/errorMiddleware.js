const errorMiddleware = (err, req, res, next) => {
 console.error(err);
 if (err.name === "SequelizeUniqueConstraintError") {
  return res.status(409).json({
    message: "Email already exists"
  });
}
 res.status(500).json({
   error: err.message
 });
};
module.exports = errorMiddleware;