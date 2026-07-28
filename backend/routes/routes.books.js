import express from "express";
import {
  addBook,
  getAllBooks,
} from "../controllers/controller.books.js";

const router = express.Router();

router.post("/", addBook);
router.get("/", getAllBooks);

export default router;