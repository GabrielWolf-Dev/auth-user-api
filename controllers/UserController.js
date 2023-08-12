const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const createUserToken = require("../helpers/createUserToken");
const getToken = require("../helpers/getToken");

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

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ raw: true, where: { email } });

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: "There is no user registered with that email!",
    });
  }

  // check if password match with db password
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ status: 400, message: "Invalid password" });
  }

  await createUserToken(
    user,
    `User ${user.name} has been successfully logged in.`,
    req,
    res
  );
};

const checkUser = async (req, res) => {
  let currentUser;

  if (req.headers.authorization) {
    const token = getToken(req);
    const decoded = jwt.verify(token, process.env.CREATE_TK_JWT_SECRET);

    currentUser = await User.findOne({ raw: true, where: { id: decoded.id } });
    currentUser.password = undefined;
  } else {
    currentUser = null;
  }

  res.status(200).send(currentUser);
};

const editUser = async (req, res) => {
  res.status(200).json({ message: "deu certo!" });
};

module.exports = {
  register,
  login,
  checkUser,
  editUser,
};
