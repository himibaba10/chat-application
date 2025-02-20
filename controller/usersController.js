const bcrypt = require("bcrypt");
const User = require("../models/User");

const getUsers = (req, res) => {
  res.render("users");
};

const addUser = async (req, res) => {
  console.log(req.body);
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
    const result = await newUser.save();
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

module.exports = { getUsers, addUser };
