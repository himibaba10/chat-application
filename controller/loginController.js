const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getLogin = (req, res) => {
  if (req.loggedInUser?.name) return res.redirect("/inbox");

  res.render("index", { errors: null, data: null });
};

const postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: username }, { mobile: username }],
    });

    if (!existingUser) {
      throw createHttpError("Login failed! Please try again.");
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchedPassword) {
      throw createHttpError("Login failed! Please try again.");
    } else {
      // Create payload for token
      const userInfo = {
        name: existingUser.name,
        email: existingUser.email,
        mobile: existingUser.mobile,
        role: existingUser.role,
      };

      // Generate token and set 24 hour expiration
      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Set cookie
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: 86400000,
        httpOnly: true,
        signed: true, //for encription
      });

      // Create local variable for user
      res.locals.loggedInUser = userInfo;

      // All done! Redirect user to inbox page
      res.redirect("/inbox");
    }
  } catch (error) {
    res.render("index", {
      errors: {
        common: {
          msg: error.message,
        },
        data: {
          username: req.body.username,
        },
      },
    });
  }
};

const postLogout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged out.");
};

module.exports = { getLogin, postLogin, postLogout };
