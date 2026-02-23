const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  emotions: {
    stressed: {
      type: Number,
      default: 0
    },
    tired: {
      type: Number,
      default: 0
    },
    anxious: {
      type: Number,
      default: 0
    },
    happy: {
      type: Number,
      default: 0
    },
    confused: {
      type: Number,
      default: 0
    },
    angry: {
      type: Number,
      default: 0
    }
  },
  sentimentScore: {
    type: Number,
    default: 0
  },
  sentimentLabel: {
    type: String,
    enum: ['Positive', 'Neutral-Positive', 'Neutral-Negative', 'Negative'],
    default: 'Neutral-Positive'
  },
  keywords: {
    type: [String],
    default: []
  },
  burnoutScore: {
    type: Number,
    default: 0
  },
  riskAnalysis: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  recommendations: {
    type: [String],
    default: []
  },
  psychologicalSummary: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
