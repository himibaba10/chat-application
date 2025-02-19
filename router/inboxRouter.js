const { Router } = require("express");
const { getInbox } = require("../controller/inboxController");
const decorativeHtmlResponse = require("../middlewares/common/decorativeHtmlResponse");

const inboxRouter = Router();

// Login page
inboxRouter.get("/", decorativeHtmlResponse("Inbox"), getInbox);

module.exports = inboxRouter;
