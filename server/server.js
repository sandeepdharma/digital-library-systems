import express from "express";
const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import { runDatabase } from "./database/config.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import booksRoutes from "./routes/books.routes.js";
import errorHandler from "./middlewares/ErrorHandler.js";
app.listen(process.env.PORT, () => {
  runDatabase();
  console.log("Backend Server Running at 5000 Success");
});

app.get("/", async (req, res) => {
  console.log("Simple Server Check Done!");
  res.send("Success");
});
app.use(
  cors({
    origin: ["http://localhost:3000"], //Frontend client
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", booksRoutes);

app.use(errorHandler);
