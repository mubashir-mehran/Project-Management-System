const asyncHandler = require("express-async-handler");
const UserController = require("../controllers/User.Controller");
const globalServices = require("../helpers/globalServices");

// To create a user
const registerUser = async (req, res) => {
  try {
    const response = await UserController.registerUser(req.body);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

// To login a user
const loginUser = async (req, res) => {
  try {
    const response = await UserController.loginUser(req.body);
    globalServices.successResponse(res, response);
  } catch (error) {
    globalServices.addStatusCodeWithError(error, res);
  }
};

const UserService = { registerUser, loginUser };

module.exports = UserService;
