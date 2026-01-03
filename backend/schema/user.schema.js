import mongoose from "mongoose"
import express from "express"

const userSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["EMPLOYEE", "ADMIN"] },
  isVerified: { type: Boolean, default: false }
});

const User=mongoose.model("User",userSchema)

export default User