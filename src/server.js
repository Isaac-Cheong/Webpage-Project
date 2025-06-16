const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Error loading the page');
    }
});

// Export the Express app for Vercel
module.exports = app; 