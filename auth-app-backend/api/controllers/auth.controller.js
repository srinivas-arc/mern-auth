import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Invalid User"));
    }
    const user_pwd = bcryptjs.compareSync(password, user.password);
    if (!user_pwd) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashed_pwd, ...rest } = user._doc;
    const expiry_date = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiry_date })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const pwd = bcryptjs.hashSync(
        "defaultwebappservicespassworduserneedtochange"
      );
      const user = new User({
        username: req.body.name,
        email: req.body.email,
        password: pwd,
        photo: req.body.photo,
      });
      await user.save();
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiry_date = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiry_date })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};
