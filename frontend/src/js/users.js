import { renderDashboard } from './auth.js';
import { apiCall } from './api.js';

// Librarian functions

// Add a new user (only accessible by librarian)
export async function addUser(userData) {
  try {
    const response = await apiCall('/users/add', 'POST', userData);
    alert('User added successfully:', response);
    renderDashboard();
  } catch (error) {
    alert(error);
  }
}

// Get all users (only accessible by librarian)
export async function getUsers() {
  try {
    const users = await apiCall('/users', 'GET');
    return users;
  } catch (error) {
    throw error;
  }
}

// Update user information (only accessible by librarian)
export async function updateUser(userId, userData) {
  try {
    const updatedUser = await apiCall(`/users/update/${userId}`, 'PUT', userData);
    alert('User updated successfully:', updatedUser);
    renderDashboard();
  } catch (error) {
    alert(error);
  }
}

// Delete a user (only accessible by librarian)
export async function deleteUser(userId) {
  try {
    await apiCall(`/users/delete/${userId}`, 'DELETE');
    alert('User deleted successfully');
    renderDashboard();
  } catch (error) {
    alert(error);
  }
}

// Get user by username (only accessible by librarian)
export async function getUserByUsername(username) {
  try {
    const user = await apiCall(`/users/${username}`, 'GET');
    return user;
  } catch (error) {
    throw error;
  }
}

