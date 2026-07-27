const API_URL = "http://localhost:5000";

// Load Books
async function loadBooks() {

    const response = await fetch(`${API_URL}/books`);
    const books = await response.json();

    const table = document.getElementById("bookTable");

    table.innerHTML = "";

    books.forEach(book => {

        table.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.available_copies}</td>
            </tr>
        `;
    });
}

// Add Book
async function addBook() {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const copies = document.getElementById("copies").value;

    const response = await fetch(`${API_URL}/books`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            author,
            category,
            available_copies:copies
        })
    });

    const data = await response.json();

    alert(data.message);

    loadBooks();
}

// Add Student
async function addStudent() {

    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;

    const response = await fetch(`${API_URL}/students`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email
        })
    });

    const data = await response.json();

    alert(data.message);
}

// Issue Book
async function issueBook() {

    const student_id =
        document.getElementById("studentId").value;

    const book_id =
        document.getElementById("bookId").value;

    const issue_date =
        document.getElementById("issueDate").value;

    const response =
        await fetch(`${API_URL}/issue-book`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            student_id,
            book_id,
            issue_date
        })
    });

    const data = await response.json();

    alert(data.message);

    loadBooks();
}

loadBooks();