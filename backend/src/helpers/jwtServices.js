const jwt = require("jsonwebtoken");

function getJwtToken(id, expiresIn) {
  return jwt.sign(
    { id },
    "SECRET",
    expiresIn && {
      expiresIn: expiresIn,
    }
  );
}
function validateJwtToken(token) {
  return jwt.verify(token, "SECRET");
}

function validateBearer(headers) {
  if (!headers) {
    throw new Error("Auth Headers Not Found");
  }
  const split = headers.split(" ");
  const token = validateJwtToken(split[1]);
  if (split[0] === "Bearer" && token) {
    return token;
  } else {
    throw new Error("Auth Headers Not Correct");
  }
}

module.exports = { getJwtToken, validateJwtToken, validateBearer };
