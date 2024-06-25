import { renderDashboard } from "./auth.js";
import { apiCall } from "./api.js";

export async function addBook(bookData) {
  try {
    const response = await apiCall("/books/add", "POST", bookData);
    alert(response.message);
    renderDashboard();
  } catch (error) {
    alert(error.message);
  }
}

export async function searchBooksByTitle(searchTerm) {
  try {
    const response = await apiCall(
      `/books/search?title=${encodeURIComponent(searchTerm)}`,
      "GET"
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getBooks() {
  try {
    const response = await apiCall("/books", "GET");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(bookId) {
  try {
    const response = await apiCall(`/books/${bookId}`, "GET");
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateBook(bookId, bookData) {
  try {
    const response = await apiCall(`/books/update/${bookId}`, "PUT", bookData);
    alert(response.message);
    renderDashboard();
  } catch (error) {
    alert(error.message);
  }
}

export async function deleteBook(bookId) {
  try {
    const response = await apiCall(`/books/delete/${bookId}`, "DELETE");
    alert(response.message);
    renderDashboard();
  } catch (error) {
    alert(error.message);
  }
}

export async function borrowBook(bookId) {
  try {
    const userId = localStorage.getItem("userId");
    const response = await apiCall("/borrows/add", "POST", {
      user_id: userId,
      book_id: bookId,
    });
    const { borrowId } = response;
    localStorage.setItem("borrowId", borrowId);
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
}

export async function returnBook() {
  try {
    const borrowId = localStorage.getItem("borrowId");
    const userId = localStorage.getItem("userId");
    const response = await apiCall(
      `/borrows/return/${borrowId}`,
      "POST", {
        user_id: userId,
      }
    );
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
}

export async function renewBook() {
  try {
    const borrowId = localStorage.getItem("borrowId");
    const userId = localStorage.getItem("userId");
    const response = await apiCall(`/borrows/renew/${borrowId}`, "POST", {
      user_id: userId,
    });
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
}
