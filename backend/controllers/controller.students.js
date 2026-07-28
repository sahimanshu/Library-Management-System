import db from "../database/db.js";

export const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;

    await db.execute(
      `INSERT INTO students (name, email)
       VALUES (?, ?)`,
      [name, email]
    );

    res.status(201).json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const [students] = await db.execute(
      "SELECT * FROM students"
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};