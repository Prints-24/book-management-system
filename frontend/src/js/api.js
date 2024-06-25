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

    // Check if the response has a JSON Content-Type header
    const contentType = response.headers.get('Content-Type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      // Throw an error containing the backend's error message or the response text
      throw new Error(responseData.error || responseData || 'Network response was not ok');
    }

    return responseData;
  } catch (error) {
    throw error;
  }
}
