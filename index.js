const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // <-- Add this for form data
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// NEW: Handle form submission
app.post('/greet', (req, res) => {
  const name = req.body.username;
  res.send(`
    <h2 style="font-family:sans-serif;">Hello, ${name}! 👋</h2>
    <p><a href="/">Go Back</a></p>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running at: http://localhost:${port}`);
});
