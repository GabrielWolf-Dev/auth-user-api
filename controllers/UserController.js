const bcrypt = require("bcrypt");

const User = require("../models/User");
const createUserToken = require("../helpers/createUserToken");

const register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  // check user exists
  const userExists = await User.findOne({ raw: true, where: { email } });

  if (userExists) {
    return res
      .status(400)
      .json({ status: 400, message: "Please enter another email" });
  }

  // create password hash
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      phone,
      email,
      password: passwordHash,
    });

    createUserToken(
      newUser,
      `User ${name} created and authentication successful!`,
      req,
      res
    );
  } catch ({ message }) {
    res.status(500).json({ status: 500, message });
  }
};

module.exports = {
  register,
};
