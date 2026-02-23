const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const { detectEmotions, calculateSentimentScore, extractKeywords } = require('../utils/emotionDetector');
const { calculateBurnoutScore, generateRiskAnalysis } = require('../utils/burnoutCalculator');
const { generatePersonalizedRecommendations, generatePsychologicalSummary } = require('../utils/aiRecommendations');

// POST: Analyze and save a journal entry
router.post('/analyze', async (req, res) => {
  try {
    const { userId, text, date = new Date().toISOString() } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!text || text.trim().length < 10) {
      return res.status(400).json({ error: 'Journal entry must be at least 10 characters long' });
    }

    // Perform analysis
    const emotions = detectEmotions(text);
    const sentiment = calculateSentimentScore(text);
    const keywords = extractKeywords(text);
    const burnoutScore = calculateBurnoutScore(emotions, sentiment);
    const riskAnalysis = generateRiskAnalysis(emotions, sentiment, burnoutScore);
    const recommendations = generatePersonalizedRecommendations(emotions, burnoutScore);
    const summary = generatePsychologicalSummary(emotions, sentiment, keywords);

    // Create and save entry
    const entry = new JournalEntry({
      userId,
      text,
      date,
      emotions,
      sentimentScore: sentiment,
      sentimentLabel: sentiment > 20 ? 'Positive' : sentiment > 0 ? 'Neutral-Positive' : sentiment > -20 ? 'Neutral-Negative' : 'Negative',
      keywords,
      burnoutScore: Math.round(burnoutScore),
      riskAnalysis,
      recommendations,
      psychologicalSummary: summary
    });

    await entry.save();

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
        entryId: entry._id
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze journal entry' });
  }
});

// GET: Get all entries for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId })
      .sort({ date: -1 });

    res.json({
      success: true,
      entries: entries.map(entry => ({
        id: entry._id,
        text: entry.text.substring(0, 100) + '...',
        date: entry.date,
        emotions: entry.emotions,
        sentimentScore: entry.sentimentScore,
        burnoutScore: entry.burnoutScore,
        keywords: entry.keywords
      }))
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// GET: Get user history/statistics
router.get('/history/:userId', async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.params.userId })
      .sort({ date: -1 });

    if (entries.length === 0) {
      return res.json({
        success: true,
        history: {
          totalEntries: 0,
          averageBurnout: 0,
          averageSentiment: 0,
          emotionBreakdown: {},
          entries: []
        }
      });
    }

    const totalEntries = entries.length;
    const averageBurnout = Math.round(entries.reduce((sum, e) => sum + e.burnoutScore, 0) / totalEntries);
    const averageSentiment = Math.round(entries.reduce((sum, e) => sum + e.sentimentScore, 0) / totalEntries);

    // Calculate emotion breakdown
    const emotionBreakdown = {};
    entries.forEach(entry => {
      Object.keys(entry.emotions).forEach(emotion => {
        emotionBreakdown[emotion] = (emotionBreakdown[emotion] || 0) + entry.emotions[emotion];
      });
    });

    res.json({
      success: true,
      history: {
        totalEntries,
        averageBurnout,
        averageSentiment,
        emotionBreakdown,
        entries: entries.map(e => ({
          date: e.date,
          burnoutScore: e.burnoutScore,
          sentimentScore: e.sentimentScore
        }))
      }
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// GET: Get a specific entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

module.exports = router;
