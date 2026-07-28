import db from "../database/db.js";

export const issueBook = async (req, res) => {
  try {
    const {
      student_id,
      book_id,
      issue_date,
      return_date,
    } = req.body;

    await db.execute(
      `INSERT INTO issued_books
      (student_id, book_id, issue_date, return_date)
      VALUES (?, ?, ?, ?)`,
      [
        student_id,
        book_id,
        issue_date,
        return_date,
      ]
    );

    await db.execute(
      `UPDATE books
       SET available_copies =
       available_copies - 1
       WHERE book_id = ?`,
      [book_id]
    );

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIssuedBooks = async (req, res) => {
  try {
    const [books] = await db.execute(`
      SELECT
      ib.issue_id,
      s.name,
      b.title,
      ib.issue_date,
      ib.return_date,
      ib.status
      FROM issued_books ib
      JOIN students s
      ON ib.student_id = s.student_id
      JOIN books b
      ON ib.book_id = b.book_id
    `);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};