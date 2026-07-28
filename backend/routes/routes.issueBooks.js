import express from "express";
import {
  issueBook,
  getIssuedBooks,
} from "../controllers/controller.issueBooks.js";

const router = express.Router();

router.post("/", issueBook);
router.get("/", getIssuedBooks);

export default router;