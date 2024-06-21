import { renderDashboard } from './auth.js';
import { apiCall } from './api.js';

export async function getBooks() {
  try {
    const response = await apiCall('/books', 'GET');
    return response;
  } catch (error) {
    console.error('Failed to fetch books', error);
    throw error;
  }
}

export async function getBookById(bookId) {
  try {
    const response = await apiCall(`/books/${bookId}`, "GET");
    return response;
  } catch (error) {
    console.error('Failed to fetch books', error);
    throw error;
  }
}

export async function addBook(bookData) {
  try {
    await apiCall('/books/add', 'POST', bookData);
    renderDashboard();
  } catch (error) {
    console.error('Failed to add book', error);
  }
}

export async function updateBook(bookId, bookData) {
  try {
    await apiCall(`/books/update/${bookId}`, 'PUT', bookData);
    renderDashboard();
  } catch (error) {
    console.error('Failed to update book', error);
  }
}


export async function deleteBook(bookId) {
  try {
    await apiCall(`/books/delete/${bookId}`, 'DELETE');
    renderDashboard();
  } catch (error) {
    console.error('Failed to delete book', error);
  }
}
