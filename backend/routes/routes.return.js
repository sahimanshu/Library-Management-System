import express from "express";
import {
  returnBook,
  getReturnedBooks,
} from "../controllers/controller.return.js";

const router = express.Router();

router.post("/", returnBook);
router.get("/", getReturnedBooks);

export default router;