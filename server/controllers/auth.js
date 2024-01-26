import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { fName, lName, email, password, occupation, location } = req.body;
    const profilePicturePath = req.file.filename;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fName,
      lName,
      email,
      password: hashPassword,
      profilePicturePath,
      occupation,
      location,
    });

    newUser
      ? res.json({ status: true, newUser })
      : req.json({ status: false, message: "Try again later" });
  } catch (error) {
    console.log({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user?._id }, process.env.privatekey);

    res.json({ status: true, user, token });
  } catch (error) {
    console.log({ message: error.message });
  }
};
