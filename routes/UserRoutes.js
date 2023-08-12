const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UsersMiddleware = require("../middlewares/UsersMiddleware");

router.post(
  "/register",
  UsersMiddleware.validateBodyReq,
  UserController.register
);
router.post("/login", UsersMiddleware.validateLogin, UserController.login);
router.get("/checkUser", UserController.checkUser);

module.exports = router;
