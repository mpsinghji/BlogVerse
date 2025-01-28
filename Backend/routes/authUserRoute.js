import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    // console.log("user", user);
    await user.save();
    res.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("error registering user", error);
    res.status(500).json({ message: "Error registering user" });
  }
}); 

export default router;