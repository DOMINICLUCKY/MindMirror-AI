const express = require('express');
const router = express.Router();
const { detectEmotions, calculateSentimentScore, extractKeywords } = require('../utils/emotionDetector');
const { calculateBurnoutScore, generateRiskAnalysis } = require('../utils/burnoutCalculator');
const { generatePersonalizedRecommendations, generatePsychologicalSummary } = require('../utils/aiRecommendations');

// In-memory storage for testing (replace with database in production)
let journalEntries = [];

// POST: Analyze a journal entry
router.post('/analyze', (req, res) => {
  try {
    const { text, date = new Date().toISOString() } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Journal entry must be at least 10 characters long'
      });
    }

    // Perform analysis
    const emotions = detectEmotions(text);
    const sentiment = calculateSentimentScore(text);
    const keywords = extractKeywords(text);
    const burnoutScore = calculateBurnoutScore(emotions, sentiment, journalEntries);
    const riskAnalysis = generateRiskAnalysis(emotions, sentiment, burnoutScore);
    const recommendations = generatePersonalizedRecommendations(emotions, burnoutScore);
    const summary = generatePsychologicalSummary(emotions, sentiment, keywords);

    // Store entry
    const entry = {
      id: journalEntries.length + 1,
      text,
      date,
      emotions,
      sentimentScore: sentiment,
      burnoutScore: Math.round(burnoutScore),
      keywords,
      timestamp: new Date()
    };
    journalEntries.push(entry);

    res.json({
      success: true,
      analysis: {
        emotions,
        sentiment: {
          score: sentiment,
          label: sentiment > 20 ? 'Positive' : sentiment > 0 ? 'Neutral-Positive' : sentiment > -20 ? 'Neutral-Negative' : 'Negative'
        },
        keywords,
        burnoutScore: Math.round(burnoutScore),
        riskAnalysis,
        psychologicalSummary: summary,
        recommendations,
        entryId: entry.id
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze journal entry' });
  }
});

// GET: Get all entries
router.get('/entries', (req, res) => {
  try {
    res.json({
      success: true,
      entries: journalEntries.map(entry => ({
        id: entry.id,
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

// GET: Get entry by ID
router.get('/entries/:id', (req, res) => {
  try {
    const entry = journalEntries.find(e => e.id === parseInt(req.params.id));
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// GET: Get dashboard data
router.get('/dashboard', (req, res) => {
  try {
    if (journalEntries.length === 0) {
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

    const averageBurnoutScore = journalEntries.reduce((sum, e) => sum + e.burnoutScore, 0) / journalEntries.length;
    const averageSentiment = journalEntries.reduce((sum, e) => sum + e.sentimentScore, 0) / journalEntries.length;

    // Calculate emotion distribution
    const emotionDistribution = {};
    journalEntries.forEach(entry => {
      Object.entries(entry.emotions).forEach(([emotion, score]) => {
        emotionDistribution[emotion] = (emotionDistribution[emotion] || 0) + score;
      });
    });

    // Normalize emotion distribution
    Object.keys(emotionDistribution).forEach(emotion => {
      emotionDistribution[emotion] = Math.round(emotionDistribution[emotion] / journalEntries.length);
    });

    // Recent trend (last 7 entries)
    const recentTrend = journalEntries.slice(-7).map(e => ({
      date: new Date(e.date).toLocaleDateString(),
      burnoutScore: e.burnoutScore,
      sentiment: e.sentimentScore
    }));

    // Weekly emotion data
    const weeklyData = journalEntries.slice(-7).map(e => ({
      date: new Date(e.date).toLocaleDateString(),
      emotions: e.emotions
    }));

    res.json({
      success: true,
      dashboardData: {
        averageBurnoutScore: Math.round(averageBurnoutScore),
        averageSentiment: Math.round(averageSentiment),
        totalEntries: journalEntries.length,
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

module.exports = router;
