const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UsersMiddleware = require("../middlewares/UsersMiddleware");

router.post(
  "/register",
  UsersMiddleware.validateBodyReq,
  UserController.register
);

module.exports = router;
