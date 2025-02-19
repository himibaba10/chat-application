const { Router } = require("express");
const { getUsers } = require("../controller/usersController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const usersRouter = Router();

// Login page
usersRouter.get("/", decorativeHtmlResponse("Users"), getUsers);

usersRouter.post(
  "/",
  avatarUploader,
  addUserValidators,
  addUserValidationHandler
);

module.exports = usersRouter;
