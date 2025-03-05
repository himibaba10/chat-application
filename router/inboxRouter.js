const { Router } = require("express");
const { getInbox } = require("../controller/inboxController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");
const authChecker = require("../middlewares/common/authChecker");

const inboxRouter = Router();

// Login page
inboxRouter.get("/", decorativeHtmlResponse("Inbox"), authChecker, getInbox);

module.exports = inboxRouter;
