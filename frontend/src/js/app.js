import {
  renderLoginPage,
  renderDashboard,
  renderBookForm,
  renderUserForm,
  renderRegisterPage,
  renderSearchResults,
} from "./auth.js";
import {
  addBook,
  updateBook,
  deleteBook,
  getBookById,
  searchBooksByTitle,
} from "./books.js";
import { apiCall } from "./api.js";
import { addUser, updateUser, deleteUser, getUserByUsername } from "./users.js";
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
    } else if (e.target.id === "add-user") {
      renderUserForm();
    } else if (e.target.id === "show-login-form") {
      renderLoginPage();
    } else if (e.target.id === "show-register-form") {
      renderRegisterPage();
    } else if (e.target.id === "show-dashboard") {
      renderDashboard();
    } else if (e.target.id === "search-button") {
      const searchTerm = document.getElementById("search-input").value;
      try {
        const results = await searchBooksByTitle(searchTerm);
        renderSearchResults(results);
      } catch (error) {
        console.error("Failed to search books", error);
      }
    } else if (e.target.id === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("borrowid");
      renderLoginPage();
    } else if (e.target.classList.contains("edit-user")) {
      const username = e.target.dataset.username;
      console.log("Username for editing:", username);
      try {
        const user = await getUserByUsername(username);
        console.log("User details fetched:", user);
        renderUserForm(user);
      } catch (error) {
        console.error("Failed to fetch user for editing", error);
      }
    } else if (e.target.classList.contains("delete-user")) {
      const userId = e.target.dataset.id;
      deleteUser(userId);
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
        const { token, role, userId } = response;
        alert("Login Successful");
        console.log("Login response:", response);
        console.log("Storing userId:", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        console.log(
          "Retrieved userId after storing:",
          localStorage.getItem("userId")
        );
        renderDashboard();
      } catch (error) {
        alert("Login failed", error);
      }
    } else if (formId === "register-form") {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const role = e.target.role.value;
      try {
        const response = await apiCall("/auth/register", "POST", {
          username,
          password,
          role,
        });
        alert("Registration successful:");
        console.log(response);
        renderLoginPage();
      } catch (error) {
        alert("Registration failed", error);
      }
    } else if (formId === "book-form") {
      const bookData = {
        title: e.target.title.value,
        isbn: e.target.isbn.value,
        publisherId: e.target.publisher_id.value,
        publicationYear: e.target.publication_year.value,
        genreId: e.target.genre_id.value,
        language: e.target.language.value,
        pages: e.target.pages.value,
        description: e.target.description.value,
      };
      const bookId = e.target.dataset.id;
      if (bookId) {
        await updateBook(bookId, bookData);
      } else {
        await addBook(bookData);
      }
    } else if (formId === "user-form") {
      const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
        role: e.target.role.value,
      };
      const userId = e.target.dataset.id;
      if (userId) {
        await updateUser(userId, userData);
      } else {
        await addUser(userData);
      }
    }
  });
});
