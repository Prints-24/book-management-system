import { renderLoginPage, renderDashboard, renderBookForm } from "./auth.js";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById,
} from "./books";
import { apiCall } from "./api.js";
import "../css/styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    renderDashboard();
  } else {
    renderLoginPage();
  }

  document.getElementById("app").addEventListener("click", async (e) => {
    if (e.target.id === "add-book") {
      renderBookForm();
    } else if (e.target.id === "logout") {
      localStorage.removeItem("token");
      renderLoginPage();
    } else if (e.target.classList.contains("edit-book")) {
      const bookId = e.target.dataset.id;
      console.log("Book ID for editing:", bookId);
      // Fetch book details and populate form for editing
      try {
        const book = await getBookById(bookId); // Implement getBookById function
        console.log("Book details fetched:", book);
        renderBookForm(book);
      } catch (error) {
        console.error("Failed to fetch book for editing", error);
      }
    } else if (e.target.classList.contains("delete-book")) {
      const bookId = e.target.dataset.id;
      deleteBook(bookId);
    }
  });

  document.getElementById("app").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formId = e.target.id;
    if (formId === "login-form") {
      const username = e.target.username.value;
      const password = e.target.password.value;
      try {
        const response = await apiCall("/auth/login", "POST", {
          username,
          password,
        });
        alert("Login Successfull");
        localStorage.setItem("token", response.token);
        renderDashboard();
      } catch (error) {
        alert("Login failed", error);
      }
    } else if (formId === "register-form") {
      const username = e.target.username.value;
      const password = e.target.password.value;
      try {
        const response = await apiCall("/auth/register", "POST", {
          username,
          password,
        });
        alert("Registration successful:");
        renderLoginPage(); // After successful registration, render login page
      } catch (error) {
        alert("Registration failed", error);
      }
    } else if (formId === "book-form") {
      const bookData = {
        title: e.target.title.value,
        isbn: e.target.isbn.value,
        publisher_id: e.target.publisher_id.value,
        publication_year: e.target.publication_year.value,
        genre_id: e.target.genre_id.value,
        language: e.target.language.value,
        pages: e.target.pages.value,
        description: e.target.description.value,
      };
      const bookId = e.target.dataset.bookId; // Get bookId if available for update
      try {
        if (bookId) {
          await updateBook(bookId, bookData);
        } else {
          await addBook(bookData);
        }
        renderDashboard(); // Refresh dashboard after adding/updating book
      } catch (error) {
        console.error("Failed to add/update book", error);
      }
    }
  });
});

renderDashboard();
