import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5175', // Your frontend URL
  credentials: true,
}));

// Dummy user data
// ...existing code...
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: ' ',
    name: 'Test User',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Frontend Developer at DevTinder',
    location: 'Mumbai, India',
    createdAt: '2023-01-01',
    role: 'user'
  }
];
// ...existing code...
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.cookie('devtinder_token', 'dummy_token_value', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Return all user info except password
    const { password: _unused, ...userInfo } = user;
    res.json({ user: userInfo });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
// ...existing code...

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});