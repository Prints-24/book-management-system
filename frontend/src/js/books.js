import { renderDashboard } from "./auth.js";
import { apiCall } from "./api.js";

export async function getBooks() {
  try {
    const response = await apiCall("/books", "GET");
    return response;
  } catch (error) {
    console.error("Failed to fetch books", error);
    throw error;
  }
}

export async function getBookById(bookId) {
  try {
    const response = await apiCall(`/books/${bookId}`, "GET");
    return response;
  } catch (error) {
    console.error("Failed to fetch book", error);
    throw error;
  }
}

export async function addBook(bookData) {
  try {
    await apiCall("/books/add", "POST", bookData);
    renderDashboard();
  } catch (error) {
    console.error("Failed to add book", error);
  }
}

export async function updateBook(bookId, bookData) {
  try {
    const updatedBook = await apiCall(
      `/books/update/${bookId}`,
      "PUT",
      bookData
    );
    renderDashboard();
  } catch (error) {
    console.error("Failed to update book", error);
  }
}

export async function deleteBook(bookId) {
  try {
    await apiCall(`/books/delete/${bookId}`, "DELETE");
    renderDashboard();
  } catch (error) {
    console.error("Failed to delete book", error);
  }
}

export async function borrowBook(bookId) {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User not logged in");
    }
    const response = await apiCall("/borrows/add", "POST", {
      user_id: userId,
      book_id: bookId,
    });
    const { borrowId } = response;
    localStorage.setItem("borrowId", borrowId);
    alert("Book borrowed successfully");
    renderDashboard();
  } catch (error) {
    console.error("Failed to borrow book", error);
    alert("Cannot borrow book!");
  }
}

export async function returnBook(borrowId) {
  try {
    const response = await apiCall(`/borrows/return/${borrowId}`, "POST");
    alert("Book returned successfully");
    renderDashboard();
  } catch (error) {
    console.error("Failed to return book", error);
    alert("Failed to return book!");
  }
}

export async function renewBook(borrowId) {
  try {
    const response = await apiCall(`/borrows/renew/${borrowId}`, "POST");
    alert("Book renewed successfully");
    renderDashboard();
  } catch (error) {
    console.error("Failed to renew book", error);
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
    console.error("Failed to search books", error);
    throw error;
  }
}
