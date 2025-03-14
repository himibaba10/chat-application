const bcrypt = require("bcrypt");
const User = require("../models/User");
const removeAvatar = require("../utils/removeAvatar");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.locals.users = users;
    res.render("users");
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
      avatar: req.files[0].filename,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured while creating user!",
        },
      },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    removeAvatar(result?.avatar);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, addUser, deleteUser };
