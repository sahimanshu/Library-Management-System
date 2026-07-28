// Data Arrays
let books = [];
let students = [];
let issuedRecords = []; // New array to track who has what book

// ID Counters
let bookIdCounter = 1;
let studentIdCounter = 1;

// --- 1. ADD BOOK ---
function addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value.trim();
    const copies = parseInt(document.getElementById('copies').value);

    if (!title || !author || !category || isNaN(copies) || copies <= 0) {
        alert("Please fill in all book details correctly.");
        return;
    }

    const newBook = {
        id: bookIdCounter++,
        title: title,
        author: author,
        category: category,
        copies: copies
    };

    books.push(newBook);
    
    // Clear inputs & update UI
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';
    document.getElementById('copies').value = '';

    loadBooks(); // Refresh book table
}

// --- 2. ADD STUDENT ---
function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();

    if (!name || !email) {
        alert("Please enter both the student name and email.");
        return;
    }

    const newStudent = {
        id: studentIdCounter++,
        name: name,
        email: email
    };

    students.push(newStudent);

    // Clear inputs & update UI
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';

    loadStudents(); // Refresh student table
}


// --- 3. ISSUE BOOK (UPDATED TO SAVE IDs) ---
function issueBook() {
    const studentId = document.getElementById('studentId').value.trim();
    const bookId = document.getElementById('bookId').value.trim();
    const issueDate = document.getElementById('issueDate').value;

    if (!studentId || !bookId || !issueDate) {
        alert("Please provide valid IDs and an issue date.");
        return;
    }

    const book = books.find(b => b.id == bookId);
    const student = students.find(s => s.id == studentId);

    if (!student) {
        alert("Student not found! Please check the Student ID.");
        return;
    }
    if (!book) {
        alert("Book not found! Please check the Book ID.");
        return;
    }
    
    if (book.copies <= 0) {
        alert("Book is not available!");
        return; 
    }

    book.copies--;
    
    // Save the record along with studentId and bookId so we can process returns
    issuedRecords.push({
        studentId: student.id,
        bookId: book.id,
        studentName: student.name,
        bookTitle: book.title,
        issueDate: issueDate
    });

    document.getElementById('studentId').value = '';
    document.getElementById('bookId').value = '';
    document.getElementById('issueDate').value = '';

    loadBooks();       
    loadIssuedBooks(); 
}

// --- 4. RETURN BOOK FORM FUNCTION (NEW) ---
function processReturn() {
    const studentId = document.getElementById('returnStudentId').value.trim();
    const bookId = document.getElementById('returnBookId').value.trim();

    if (!studentId || !bookId) {
        alert("Please provide both Student ID and Book ID to return a book.");
        return;
    }

    // Look for a matching record where both the student ID and book ID match
    const recordIndex = issuedRecords.findIndex(r => r.studentId == studentId && r.bookId == bookId);

    if (recordIndex === -1) {
        alert("No active issue record found for this Student and Book combination.");
        return;
    }

    // Get the record details
    const record = issuedRecords[recordIndex];

    // Find the book in the library and add 1 back to the available copies
    const book = books.find(b => b.id == record.bookId);
    if (book) {
        book.copies++;
    }

    // Remove the record from the issued list
    issuedRecords.splice(recordIndex, 1);

    alert(`Success! "${record.bookTitle}" has been returned successfully.`);

    // Clear the return form inputs
    document.getElementById('returnStudentId').value = '';
    document.getElementById('returnBookId').value = '';

    // Automatically refresh the tables on the screen
    loadBooks();
    loadIssuedBooks();
}
// --- UI UPDATE FUNCTIONS ---

function loadBooks() {
    const tableBody = document.getElementById('bookTable');
    tableBody.innerHTML = '';
    books.forEach(book => {
        tableBody.innerHTML += `
            <tr>
                <td><strong>${book.id}</strong></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.copies}</td>
            </tr>
        `;
    });
}

// --- LOAD STUDENTS UI ---
function loadStudents() {
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = '';
    students.forEach(student => {
        tableBody.innerHTML += `
            <tr>
                <td><strong>${student.id}</strong></td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// --- DELETE STUDENT ---
function deleteStudent(id) {
    // Show a confirmation popup before deleting
    if (confirm("Are you sure you want to delete this student?")) {
        // Remove the student with the matching id from the array
        students = students.filter(student => student.id != id);
        
        // Refresh the student table on the screen
        loadStudents(); 
    }
}

// --- LOAD ISSUED BOOKS UI (UPDATED WITH IDs) ---
function loadIssuedBooks() {
    const tableBody = document.getElementById('issuedTable');
    tableBody.innerHTML = '';
    issuedRecords.forEach(record => {
        tableBody.innerHTML += `
            <tr>
                <td><strong>${record.studentId}</strong></td>
                <td>${record.studentName}</td>
                <td><strong>${record.bookId}</strong></td>
                <td>${record.bookTitle}</td>
                <td>${record.issueDate}</td>
            </tr>
        `;
    });
}
window.onload = () => {
    // Add one dummy book
    books.push({
        id: bookIdCounter++,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        copies: 3
    });
    
    // Add one dummy student
    students.push({
        id: studentIdCounter++,
        name: "Jane Doe",
        email: "jane@example.com"
    });

    // Render tables
    loadBooks();
    loadStudents();
    loadIssuedBooks();
};

