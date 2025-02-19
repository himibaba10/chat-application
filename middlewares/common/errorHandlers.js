const createHttpError = require("http-errors");

// 404 error handler
const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, "Your requested content was not found!"));
};

// Default error handler
const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    // HTML view
    res.render("error", { title: "Error page" });
  } else {
    // JSON view
    res.json(res.locals.error);
  }
};

module.exports = { notFoundHandler, errorHandler };
