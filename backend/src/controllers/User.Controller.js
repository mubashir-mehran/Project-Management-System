const globalServices = require("../helpers/globalServices");
const { getJwtToken } = require("../helpers/jwtServices");
const { userValidator } = require("../helpers/validators");
const UserModel = require("../models/User.Model");

// To create a user
const registerUser = async (UserBody) => {
  await userValidator.validate(UserBody);

  const userExists = await UserModel.findOne({ email: UserBody.email });

  if (userExists) globalServices.throwCustomError("User Already Exists", 404);

  return await UserModel.create(UserBody);
};

// To login user
const loginUser = async (credentials) => {
  const { email, password } = credentials;

  if (!email && !password)
    globalServices.throwCustomError("Email and Password are required", 400);

  const userExists = await UserModel.findOne({ email });

  if (!userExists) globalServices.throwCustomError("User Does Not Exists", 404);

  if (!(await userExists.matchPassword(password))) {
    globalServices.throwCustomError("Wrong credentials. Try again", 400);
  }

  return {
    user: userExists,
    token: getJwtToken(userExists?._id),
  };
};

const UserController = { registerUser, loginUser };

module.exports = UserController;
