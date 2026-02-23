const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// GET: Get all entries for dashboard
router.get('/entries/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId })
      .sort({ date: -1 });

    res.json({
      success: true,
      entries: entries.map(entry => ({
        id: entry._id,
        date: entry.date,
        emotions: entry.emotions,
        sentimentScore: entry.sentimentScore,
        burnoutScore: entry.burnoutScore,
        summary: entry.text.substring(0, 100) + '...'
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// GET: Get dashboard data for a user
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId })
      .sort({ date: -1 });

    if (entries.length === 0) {
      return res.json({
        success: true,
        dashboardData: {
          averageBurnoutScore: 0,
          averageSentiment: 0,
          totalEntries: 0,
          emotionDistribution: {},
          recentTrend: [],
          weeklyData: []
        }
      });
    }

    const averageBurnoutScore = entries.reduce((sum, e) => sum + e.burnoutScore, 0) / entries.length;
    const averageSentiment = entries.reduce((sum, e) => sum + e.sentimentScore, 0) / entries.length;

    // Calculate emotion distribution
    const emotionDistribution = {};
    entries.forEach(entry => {
      Object.entries(entry.emotions).forEach(([emotion, score]) => {
        emotionDistribution[emotion] = (emotionDistribution[emotion] || 0) + score;
      });
    });

    // Normalize emotion distribution
    Object.keys(emotionDistribution).forEach(emotion => {
      emotionDistribution[emotion] = Math.round(emotionDistribution[emotion] / entries.length);
    });

    // Recent trend (last 7 entries)
    const recentTrend = entries.slice(0, 7).map(e => ({
      date: new Date(e.date).toLocaleDateString(),
      burnoutScore: e.burnoutScore,
      sentiment: e.sentimentScore
    })).reverse();

    // Weekly emotion data
    const weeklyData = entries.slice(0, 7).map(e => ({
      date: new Date(e.date).toLocaleDateString(),
      emotions: e.emotions
    })).reverse();

    res.json({
      success: true,
      dashboardData: {
        averageBurnoutScore: Math.round(averageBurnoutScore),
        averageSentiment: Math.round(averageSentiment),
        totalEntries: entries.length,
        emotionDistribution,
        recentTrend,
        weeklyData
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET: Get trends for a user
router.get('/trends/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId })
      .sort({ date: 1 });

    const trends = entries.map(e => ({
      date: new Date(e.date).toISOString().split('T')[0],
      burnoutScore: e.burnoutScore,
      sentimentScore: e.sentimentScore
    }));

    res.json({
      success: true,
      trends
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

module.exports = router;
