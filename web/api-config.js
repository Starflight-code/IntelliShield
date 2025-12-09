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

async function fetchMe(email) {
  try {
    const url = email ? `${API_BASE_URL}/me?email=${encodeURIComponent(email)}` : `${API_BASE_URL}/me`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching current user from API:', error);
    return null;
  }
}

async function postMe(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      let message = `HTTP error! status: ${response.status}`;
      try {
        const body = await response.json();
        if (body?.error) message = body.error;
      } catch (_) {}
      throw new Error(message);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error posting /me to API:', error);
    throw error;
  }
}

