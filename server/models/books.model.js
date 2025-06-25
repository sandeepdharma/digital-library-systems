import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    librarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Librarian",
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Borrower" }],
  },
  { timestamps: true },
);
export const Book = mongoose.model("Book", booksSchema);
