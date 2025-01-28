import express from "express";
import User from "../models/userModel.js";
import generateToken from "../middleware/generateToken.js";

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

//login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    //compare the password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // generate token
    const token = await generateToken(user._id);
    // console.log("Generated Token: ", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.status(201).send({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("error logging in user", error);
    res.status(500).json({ message: "Error logging in user" });
  }
});

//logout a user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    console.error("error logging out user", error);
    res.status(500).json({ message: "Error logging out user" });
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role");
    res.status(200).send({ message: "All users found successfully", users });
  } catch (error) {
    console.error("error getting all users", error);
    res.status(500).json({ message: "Error getting all users" });
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("error deleting user", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

//update a user role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role}, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("error updating user role", error);
    res.status(500).json({ message: "Error updating user role" });
  }
});

export default router;
