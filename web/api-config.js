const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';

async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users from API:', error);
    try {
      const fallbackResponse = await fetch('./data.json');
      const fallbackData = await fallbackResponse.json();
      console.warn('Using fallback data.json due to API error');
      return fallbackData;
    } catch (fallbackError) {
      console.error('Error fetching fallback data:', fallbackError);
      return [];
    }
  }
}

