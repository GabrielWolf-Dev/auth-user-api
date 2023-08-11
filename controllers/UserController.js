const User = require("../models/User");

const register = async (req, res) => {
  const { email } = req.body;
  // check user exists
  const userExists = await User.findOne({ raw: true, where: { email } });

  if (userExists) {
    return res
      .status(400)
      .json({ status: 400, message: "Please enter another email" });
  }

  res.json("foi");
};

module.exports = {
  register,
};
