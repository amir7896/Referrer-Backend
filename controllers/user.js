const User = require("../models/user");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const adminUser = {
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("adminpassword", 10),
    };
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      const superAdmin = await User.create(adminUser);
      return res.json(superAdmin);
    } else {
      return res.json({ message: "Super admin already exists!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const registerUser = async (req, res) => {
  try {
    const { username, email, password, referredBy } = req.body;

    // Check if referredBy user exists
    const referrer = await User.findById(referredBy);
    if (!referrer) {
      return res.status(400).json({ error: "Referring user not found" });
    }

    // Calculate the commissions
    const newSignupCommission = 0.9;
    const referringUserCommission = 0.1;
    const newSignupUserCommission =
      referringUserCommission * newSignupCommission;

    // Create the new user
    const newUser = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      referredBy,
      commission: newSignupUserCommission,
    };

    const user = await User.create(newUser);

    // Update the commission of the referring user and the entire referral chain
    let currentReferrer = referrer;
    while (currentReferrer) {
      currentReferrer.commission += referringUserCommission;
      currentReferrer.referralChain.push(user._id);
      await currentReferrer.save();
      currentReferrer = currentReferrer.referredBy
        ? await User.findById(currentReferrer.referredBy)
        : null;
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAdmin,
  registerUser,
};
