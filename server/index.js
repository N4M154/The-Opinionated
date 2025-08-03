// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const app = express();
// const PORT = process.env.PORT || 4000;
// const JWT_SECRET = process.env.JWT_SECRET;

// app.use(cors());
// app.use(express.json());

// // 🧠 Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("🔥 MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // 🧩 Mongoose Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model("User", userSchema);

// // 🛡 Middleware to verify JWT
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // 🔐 Signup
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // 🔐 Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const validPass = await bcrypt.compare(password, user.password);
//     if (!validPass)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // 🔐 Protected route
// app.get("/home", authenticateToken, (req, res) => {
//   res.json({
//     message: `Welcome ${req.user.email}, you're in the secure zone 🔐`,
//   });
// });

// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);

// Connect DB and Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🟢 Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
