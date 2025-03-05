const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const authChecker = async (req, res, next) => {
  // Get cookie
  const cookie = req.signedCookies["chat-app-token"];

  if (!cookie) return res.render("index");

  try {
    var decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    req.loggedInUser = decoded;
    res.locals.loggedInUser = {
      name: decoded.name,
      email: decoded.email,
      mobile: decoded.mobile,
      role: decoded.role,
    };

    next();
  } catch (err) {
    next(createHttpError(err.message));
  }
};

module.exports = authChecker;
