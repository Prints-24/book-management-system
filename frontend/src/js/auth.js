import { getBooks } from "./books.js";

let isLoginFormActive = true;

export function renderLoginPage() {
  document.getElementById("app").innerHTML = `
  <div id="login-signup-container">
    <form id="login-form" ${isLoginFormActive ? "" : 'style="display: none;"'}>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="#" id="switch-to-signup">Sign Up</a></p>
      </form>
      <form id="register-form" ${
        isLoginFormActive ? 'style="display: none;"' : ""
      }>
        <h2>Register</h2>
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="#" id="switch-to-login">Login</a></p>
      </form>
    </div>
  `;
  document.getElementById("switch-to-signup").addEventListener("click", (e) => {
    e.preventDefault();
    isLoginFormActive = false;
    renderLoginPage();
  });

  document.getElementById("switch-to-login").addEventListener("click", (e) => {
    e.preventDefault();
    isLoginFormActive = true;
    renderLoginPage();
  });
}

export async function renderDashboard() {
  document.getElementById("app").innerHTML = `
    <header>
      <h1>Dashboard</h1>
      <nav>
        <a href="#" id="add-book">Add Book</a>
        <a href="#" id="logout">Logout</a>
      </nav>
    </header>
    <section id="books-list"></section>
  `;

  try {
    const books = await getBooks(); // Wait for getBooks to fetch books
    const booksList = document.getElementById("books-list");

    if (!booksList) {
      throw new Error("Element with id 'books-list' not found in the DOM.");
    }

    booksList.innerHTML = "";

    books.forEach((book) => {
      booksList.innerHTML += `
        <div>
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <button data-id="${book.id}" class="edit-book">Edit</button>
          <button data-id="${book.id}" class="delete-book">Delete</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Failed to fetch books", error);
  }
}

export function renderBookForm(book = {}) {
  const formTitle = book.id ? "Edit Book" : "Add Book";
  const submitButtonText = book.id ? "Update Book" : "Add Book";

  // Constructing the form HTML with values from the 'book' object
  const formHtml = `
    <form id="book-form" data-book-id="${book.id || ""}">
      <h2>${formTitle}</h2>
      <input type="text" name="title" placeholder="Title" value="${
        book.title || ""
      }" required>
      <input type="text" name="isbn" placeholder="ISBN" value="${
        book.isbn || ""
      }" required>
      <input type="number" name="publisher_id" placeholder="Publisher ID" value="${
        book.publisher_id || ""
      }" required>
      <input type="number" name="publication_year" placeholder="Publication Year" value="${
        book.publication_year || ""
      }" required>
      <input type="number" name="genre_id" placeholder="Genre ID" value="${
        book.genre_id || ""
      }" required>
      <input type="text" name="language" placeholder="Language" value="${
        book.language || ""
      }" required>
      <input type="number" name="pages" placeholder="Pages" value="${
        book.pages || ""
      }" required>
      <textarea name="description" placeholder="Description" required>${
        book.description || ""
      }</textarea>
      <button type="submit">${submitButtonText}</button>
      <button type="button" id="back-to-dashboard">Back to Dashboard</button>
    </form>
  `;

  // Render the form in the app container
  document.getElementById("app").innerHTML = formHtml;

  // Attach event listener to the back button
  document.getElementById("back-to-dashboard").addEventListener("click", () => {
    renderDashboard(); // Call your renderDashboard function to navigate back
  });
}
