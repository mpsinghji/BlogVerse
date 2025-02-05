import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "no token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).json({ message: "Invalid token provided" });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error("Error verifying token", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
