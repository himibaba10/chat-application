const { Router } = require("express");
const { getLogin } = require("../controller/loginController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");

const loginRouter = Router();

// Login page
loginRouter.get("/", decorativeHtmlResponse("Login"), getLogin);

module.exports = loginRouter;
