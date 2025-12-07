const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function getUsersData() {
  try {
    const dataPath = path.join(__dirname, 'web', 'data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return [];
  }
}

app.get('/users', (req, res) => {
  try {
    const users = getUsersData();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/me', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const testCredentials = {
      'test@intellishield.com': 'password123'
    };

    if (testCredentials[email] !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const users = getUsersData();
    const user = users[0] || null;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      email: email,
      ...user
    });
  } catch (error) {
    console.error('Error in POST /me:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`GET /users endpoint available at http://localhost:${PORT}/users`);
});

