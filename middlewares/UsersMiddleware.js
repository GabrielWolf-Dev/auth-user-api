const validateBodyReq = (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  const isFieldsUndefined =
    !name || !email || !phone || !password || !confirmPassword;

  if (isFieldsUndefined) {
    return res
      .status(400)
      .json({ status: 400, message: "Fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: 400,
      message: "Password must contain at least 8 characters",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 400,
      message: "The password and your confirmation must match!",
    });
  }

  next();
};

module.exports = {
  validateBodyReq,
};
