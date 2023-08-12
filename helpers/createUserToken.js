const jwt = require("jsonwebtoken");

const createUserToken = async (
  user,
  message = "Successfully created token",
  req,
  res
) => {
  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.CREATE_TK_JWT_SECRET
  );

  // return token
  res.status(200).json({
    userId: user.id,
    name: user.name,
    message,
    token,
  });
};

module.exports = createUserToken;
