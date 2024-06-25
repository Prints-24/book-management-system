import { renderDashboard } from "./auth.js";
import { apiCall } from "./api.js";

export async function addBook(bookData) {
  try {
    await apiCall("/books/add", "POST", bookData);
    renderDashboard();
  } catch (error) {
    alert(error);
  }
}

export async function getBooks() {
  try {
    const response = await apiCall('/books', 'GET');
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
    await apiCall(`/books/update/${bookId}`, "PUT", bookData);
    renderDashboard();
  } catch (error) {
    alert(error);
  }
}

export async function deleteBook(bookId) {
  try {
    await apiCall(`/books/delete/${bookId}`, "DELETE");
    alert('Book deleted successfully');
    renderDashboard();
  } catch (error) {
    alert(error);
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
    alert("Book borrowed successfully");
  } catch (error) {
    alert(error);
  }
}

export async function returnBook() {
  try {
    const borrowId = localStorage.getItem("borrowId");
    await apiCall(`/borrows/return/${borrowId}`, "POST");
    alert("Book returned successfully");
  } catch (error) {
    alert(error);
  }
}

export async function renewBook() {
  try {
    const borrowId = localStorage.getItem("borrowId");
    await apiCall(`/borrows/renew/${borrowId}`, "POST", {});
    alert("Book renewed successfully");
  } catch (error) {
    alert(error);
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
