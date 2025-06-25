import express from "express";
const route = express.Router();
import { StatusCodes } from "http-status-codes";
import Member from "../models/auth.model.js";
import { Publisher } from "../models/users.model.js";
import { existingUser } from "../utils.js";
import mongoose from "mongoose";

import dotnev from "dotenv";
import { Book } from "../models/books.model.js";
dotnev.config();

route.post("/add-book", async (req, res, next) => {
  const { title, description, image, author, publisher, librarian, borrowers } =
    req.body;
  console.log(req.body);
  try {
    const book = new Book({
      title,
      description,
      image,
      ...(author && { author }),
      ...(librarian && { librarian }),
      ...(publisher && { publisher }),
      ...(borrowers && borrowers.length && { borrowers }),
    });
    await book.save();
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "New Book Added", data: book });
  } catch (error) {
    next(error);
  }
});

route.get("/get-all-books", async (req, res, next) => {
  try {
    const books = await Book.find({});
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "All Books", data: books });
  } catch (error) {
    next(error);
  }
});

route.get("/get-all-books/users", async (req, res, next) => {
  const { user } = req.body;
  try {
    let users = ["publisher", "author", "librarian", "borrower"];
    if (!users.includes(user.toLowerCase())) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "Invalid user request" });
    }

    const books = await Book.find({
      [user]: { $exists: true, $ne: null },
    }).populate(user);
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "All Books", data: books });
  } catch (error) {
    next(error);
  }
});
export default route;
