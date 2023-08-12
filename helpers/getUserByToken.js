const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Access denied!" });
  }

  const decoded = jwt.verify(token, process.env.CREATE_TK_JWT_SECRET);
  const user = await User.findOne({ raw: true, where: { id: decoded.id } });

  return user;
};

module.exports = getUserByToken;
