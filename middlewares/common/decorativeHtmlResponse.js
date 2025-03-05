const decorativeHtmlResponse = (pageTitle) => {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
    res.locals.errors = {};
    res.locals.data = {};
    res.locals.loggedInUser = {};
    res.locals.users = [];
    next();
  };
};

module.exports = decorativeHtmlResponse;
