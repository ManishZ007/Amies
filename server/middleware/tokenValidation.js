import jwt from "jsonwebtoken";

export const tokenValidation = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.json({ status: false, message: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.lenght).trimLeft();
    }

    const verified = jwt.verify(token, process.env.privatekey);
    req.user = verified;

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
