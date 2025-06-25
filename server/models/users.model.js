import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "Member",
    },
    publisher_name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const authorSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "Member",
    },
    author_name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const librarianSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "Member",
    },
    librarian_name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    joined_at: {
      type: Date,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    books_handed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true },
);

const borrowerSchema = new mongoose.Schema(
  {
    borrower_name: {
      type: String,
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  { timestamps: true },
);
export const Author = mongoose.model("Author", authorSchema);
export const Borrower = mongoose.model("Borrower", borrowerSchema);
export const Publisher = mongoose.model("Publisher", publisherSchema);
export const Librarian = mongoose.model("Librarian", librarianSchema);
