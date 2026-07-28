import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/routes.books.js";
import studentRoutes from "./routes/routes.students.js";
import issuedBookRoutes from "./routes/routes.issueBooks.js";
import returnBookRoutes from "./routes/routes.return.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running successfully!",
  });
});

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/issued-books", issuedBookRoutes);
app.use("/api/return-books", returnBookRoutes);

// Port
const PORT = process.env.PORT || 9000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});