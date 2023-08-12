const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UsersMiddleware = require("../middlewares/UsersMiddleware");

router.post(
  "/register",
  UsersMiddleware.validateBodyReq,
  UserController.register
);
router.post("/login", UsersMiddleware.validateLogin, UserController.login);

module.exports = router;
