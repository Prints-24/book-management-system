export async function apiCall(url, method, data) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`http://localhost:3000${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined
      },
      body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}
