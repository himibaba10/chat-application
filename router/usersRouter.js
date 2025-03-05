const { Router } = require("express");
const { getUsers, addUser } = require("../controller/usersController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const authChecker = require("../middlewares/common/authChecker");

const usersRouter = Router();

// Login page
usersRouter.get("/", decorativeHtmlResponse("Users"), authChecker, getUsers);

usersRouter.post(
  "/",
  avatarUploader,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

module.exports = usersRouter;
