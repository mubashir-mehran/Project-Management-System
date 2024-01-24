const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("Mongoose connection ready");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

const mongoConnect = () => {
  console.log("Connecting Mongo Db...");

  mongoose.connect("mongodb://127.0.0.1:27017/projectDB").catch((err) => {
    console.log(err);
  });
};
const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { mongoConnect, mongoDisconnect };
