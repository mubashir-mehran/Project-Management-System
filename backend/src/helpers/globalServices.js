const successResponse = (res, payload, status = 200) => {
  res.status(status).json({
    success: true,
    response: payload,
  });
};
const failedResponse = (res, err) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    success: false,
    message: err.message,
    payload: err.payload,
    stack: err.stack,
  });
};
const throwCustomError = (message, statusCode, payload) => {
  const error = new Error();
  error.name = "custom";
  error.message = message;
  error.payload = payload;
  error.statusCode = statusCode || 419;
  throw error;
};
const addStatusCodeWithError = (err, res) => {
  const { name, message, stack, statusCode, payload } = err;
  const error = new Error();
  error.name = name;
  error.message = message;
  error.stack = stack;
  error.payload = payload;

  throw error;
};
const globalServices = {
  successResponse,
  failedResponse,
  throwCustomError,
  addStatusCodeWithError,
};

module.exports = globalServices;
