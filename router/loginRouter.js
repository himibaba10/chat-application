const { Router } = require("express");
const { getLogin, postLogin } = require("../controller/loginController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");
const {
  loginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidators");

const loginRouter = Router();

// Login page
loginRouter.get("/", decorativeHtmlResponse("Login"), getLogin);
loginRouter.post(
  "/",
  decorativeHtmlResponse("Login"),
  loginValidators,
  loginValidationHandler,
  postLogin
);

module.exports = loginRouter;
