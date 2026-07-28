import db from "../database/db.js";

export const returnBook = async (req, res) => {
  try {
    const {
      student_id,
      book_id,
      return_date,
    } = req.body;

    await db.execute(
      `INSERT INTO return_books
      (student_id, book_id, return_date)
      VALUES (?, ?, ?)`,
      [
        student_id,
        book_id,
        return_date,
      ]
    );

    await db.execute(
      `UPDATE issued_books
       SET status = 'RETURNED'
       WHERE student_id = ?
       AND book_id = ?`,
      [student_id, book_id]
    );

    await db.execute(
      `UPDATE books
       SET available_copies =
       available_copies + 1
       WHERE book_id = ?`,
      [book_id]
    );

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReturnedBooks = async (req, res) => {
  try {
    const [books] = await db.execute(`
      SELECT
      rb.return_book_id,
      s.name,
      b.title,
      rb.return_date
      FROM return_books rb
      JOIN students s
      ON rb.student_id = s.student_id
      JOIN books b
      ON rb.book_id = b.book_id
    `);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};