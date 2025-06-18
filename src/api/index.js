// src/api/index.js
const express    = require('express');
const serverless = require('serverless-http');

const app = express();

// Your root endpoint
app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

// If you have other routes (e.g., /enrollments), define them here
// app.get('/enrollments', async (req, res) => { ... });

module.exports.handler = serverless(app);
