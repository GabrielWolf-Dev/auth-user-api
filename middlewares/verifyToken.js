const jwt = require("jsonwebtoken");
const getToken = require("../helpers/getToken");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Access denied!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    const verified = jwt.verify(token, process.env.CREATE_TK_JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
