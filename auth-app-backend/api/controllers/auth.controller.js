import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const bcrypt_pwd = bcryptjs.hashSync(password, 10);
    const user = new User({ username, email, password: bcrypt_pwd });
    await user.save();
    res.status(201).json({
      username,
      email,
      message: "created user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
