const { Router } = require("express");
const { getInbox } = require("../controller/inboxController");
const decorativeHtmlResponse = require("../middlewares/decorativeHtmlResponse");

const inboxRouter = Router();

// Login page
inboxRouter.get("/", decorativeHtmlResponse("Inbox"), getInbox);

module.exports = inboxRouter;
