const validateBodyReq = (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  const isFieldsUndefined =
    !name || !email || !phone || !password || !confirmPassword;
  const idFieldsString =
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string";

  if (isFieldsUndefined) {
    return res
      .status(400)
      .json({ status: 400, message: "Fields are required" });
  }

  if (idFieldsString) {
    return res
      .status(400)
      .json({ status: 400, message: "Fields must be of type string" });
  }

  if (phone.length > 11) {
    return res.status(400).json({
      status: 400,
      message:
        "The phone number has a maximum of 11 digits. 'DD + phone number'",
    });
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

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ status: 400, message: "Email is required." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ status: 400, message: "Password is required." });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ status: 400, message: "Fields must be of type string" });
  }

  next();
};

module.exports = {
  validateBodyReq,
  validateLogin,
};
