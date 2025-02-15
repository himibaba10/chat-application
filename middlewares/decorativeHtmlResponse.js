const decorativeHtmlResponse = (pageTitle) => {
  return (req, res, next) => {
    res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
    next();
  };
};

module.exports = decorativeHtmlResponse;
