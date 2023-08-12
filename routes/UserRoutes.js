const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UsersMiddleware = require("../middlewares/UsersMiddleware");
const verifyToken = require("../middlewares/verifyToken");

router.post(
  "/register",
  UsersMiddleware.validateBodyReq,
  UserController.register
);
router.post("/login", UsersMiddleware.validateLogin, UserController.login);
router.get("/checkUser", UserController.checkUser);
router.patch(
  "/edit/:id",
  UsersMiddleware.validateBodyReq,
  verifyToken,
  UserController.editUser
);

module.exports = router;
