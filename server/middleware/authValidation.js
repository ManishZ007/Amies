import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const registrationValidation = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailValidation = await User.findOne({ email });
    if (emailValidation) {
      res.json({
        status: false,
        message: "This email id already present",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const loginValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validEmail = await User.findOne({ email });

    if (validEmail) {
      const hashPassword = validEmail.password;
      const validPassword = await bcrypt.compare(password, hashPassword);

      if (validPassword) {
        next();
      } else {
        res.json({ status: false, message: "Enter the valide password" });
      }
    } else {
      res.json({ status: false, message: "Emial is wrong try again" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
