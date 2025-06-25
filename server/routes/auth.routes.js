import express from "express";
const route = express.Router();
import { StatusCodes } from "http-status-codes";
import Member from "../models/auth.model.js";
import { existingUser } from "../utils.js";

import dotnev from "dotenv";
dotnev.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

route.post("/signup", async (req, res, next) => {
  const { member_name, email, password } = req.body;

  if (!member_name || !email || !password)
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ success: false, message: "All Details Required" });

  try {
    const hashedPsssword = await bcrypt.hash(password, 10);
    let user = {
      member_name: member_name,
      email: email,
      password: hashedPsssword,
    };
    const newUser = new Member(user);
    await newUser.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "New user registered",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isExistingUser = await Member.findOne({ email });
    if (!isExistingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "User Not Found! Please Signup" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isExistingUser.password,
    );
    if (!isValidPassword)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Wrong Password" });

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.HIDDEN_CODE,
      { expiresIn: "24h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Login Success", token: token });
  } catch (error) {
    next(error);
  }
});

export default route;
