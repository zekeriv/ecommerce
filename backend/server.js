// In your backend/server.js
const express = require('express');
const app = express();

// AWS App Runner sets the PORT environment variable
const PORT = process.env.PORT || 4000;

// Your existing middleware and routes here...

// Serve static files for frontend and admin
app.use('/frontend', express.static('public/frontend'));
app.use('/admin', express.static('public/admin'));

// Health check endpoint (recommended for App Runner)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});