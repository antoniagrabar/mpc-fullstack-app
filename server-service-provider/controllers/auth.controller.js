import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
import User from "../models/User.js";

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

export const registerController = async (req, res) => {
  if (req.body !== undefined) {
    const { name, email, password } = req.body;

    const isValid = await validateSignUpData(req, res);

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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email }).exec();

    if (dbUser) {
      const match = await bcrypt.compare(password, dbUser.password);

      if (match) {
        const jwtToken = jwt.sign(
          { _id: dbUser._id, name: dbUser.name, email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          message: "Login successful",
          token: jwtToken,
        });
      } else {
        res
          .status(401)
          .json({ message: "User not found or password incorrect." });
      }
    } else {
      res.status(404).json({ message: "Email is not registered." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};
