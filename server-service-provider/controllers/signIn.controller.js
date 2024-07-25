import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signInController = async (req, res) => {
  if (req.body !== undefined) {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email }).exec();
    if (dbUser) {
      const match = await bcrypt.compare(password, dbUser.password);

      if (match) {
        const token = jwt.sign(
          { _id: dbUser._id, name: dbUser.name, email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
      } else {
        res.status(400).json({ message: "Incorrect password." });
      }
    } else {
      res.status(400).json({ message: "Email is not registered." });
    }
  } else {
    res.status(500).json({ message: "Request body is undefined" });
  }
};
