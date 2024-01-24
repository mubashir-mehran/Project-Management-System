const UserRouter = require("express").Router();
const UserService = require("../services/User.Service");

UserRouter.post("/register", UserService.registerUser) // To Create a user
  .post("/login", UserService.loginUser); // To login user

module.exports = UserRouter;
