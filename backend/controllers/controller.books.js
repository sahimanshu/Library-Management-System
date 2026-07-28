import db from "../database/db.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, category, available_copies } = req.body;

    await db.execute(
      `INSERT INTO books
      (title, author, category, available_copies)
      VALUES (?, ?, ?, ?)`,
      [title, author, category, available_copies]
    );

    res.status(201).json({
      success: true,
      message: "Book added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const [books] = await db.execute(
      "SELECT * FROM books"
    );

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};