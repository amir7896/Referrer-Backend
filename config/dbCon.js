const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/Refer-App";

const dbConnection = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log(`Datebase not connected , Error : ${err}`);
    });
};

module.exports = dbConnection;
