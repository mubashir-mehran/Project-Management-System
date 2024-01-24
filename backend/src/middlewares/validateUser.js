const jwt = require("jsonwebtoken");
const { validateJwtToken } = require("../helpers/jwtServices");
const UserModel = require("../models/User.Model");

const authenticateMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const { id } = validateJwtToken(token);
    const user = await UserModel.findById(id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authenticateMiddleware;
