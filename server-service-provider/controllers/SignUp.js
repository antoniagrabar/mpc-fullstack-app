const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const User = require("../models/User");

const saltRounds = 10;

const validateSignUpData = async (req, res) => {
  const { name, email, password } = req.body;

  if (name.trim().length === 0) {
    res.status(400).json({ message: "Please enter a name" });
    return false;
  }
  if (!isEmail(email)) {
    res.status(400).json({ message: "Please enter a valid email" });
    return false;
  }
  if (password.trim().length === 0) {
    res.status(400).json({ message: "Please enter a password" });
    return false;
  } else if (password.trim().length <= 7) {
    res
      .status(400)
      .json({ message: "Please enter a password with minimum 8 characters" });
    return false;
  }

  const existingUser = await User.findOne({ email }).exec();

  if (existingUser) {
    res
      .status(400)
      .json({ message: "Email is already registered. Please login." });
    return false;
  }

  return true;
};

module.exports = async (req, res) => {
  if (req.body !== undefined) {
    const { name, email, password } = req.body;

    const isValid = await validateSignUpData(req, res);
    console.log("isvalid: ", isValid);

    if (isValid) {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        res.json({
          message: "Account created successfully",
          user: { _id: user.id, name: user.name, email: user.email },
        });
        res.status(201).send();
      } catch (error) {
        console.log(error);
        res.status(400).send();
      }
    }
  } else {
    res.status(500).json({ message: "Request body is undefined" });
  }
};
