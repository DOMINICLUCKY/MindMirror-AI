const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const journalRoutes = require('./routes/journal');

app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/journal', journalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MindMirror AI backend is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✨ MindMirror AI Server running on http://localhost:${PORT}`);
});
