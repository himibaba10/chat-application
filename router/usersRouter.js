const { Router } = require("express");
const { getUsers } = require("../controller/usersController");
const decorativeHtmlResponse = require("../middlewares/decorativeHtmlResponse");

const usersRouter = Router();

// Login page
usersRouter.get("/", decorativeHtmlResponse("Users"), getUsers);

module.exports = usersRouter;
