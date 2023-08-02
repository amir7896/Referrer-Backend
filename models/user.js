const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referredBy: { type: Schema.Types.ObjectId, ref: "User" },
  commission: { type: Number, default: 0 },
  referralChain: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
