const { Router } = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
} = require("../controller/loginController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");
const {
  loginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidators");
const authChecker = require("../middlewares/common/authChecker");

const loginRouter = Router();

// Login page
loginRouter.get("/", decorativeHtmlResponse("Login"), authChecker, getLogin);
loginRouter.post(
  "/",
  decorativeHtmlResponse("Login"),
  loginValidators,
  loginValidationHandler,
  postLogin
);

loginRouter.delete("/", postLogout);

module.exports = loginRouter;
