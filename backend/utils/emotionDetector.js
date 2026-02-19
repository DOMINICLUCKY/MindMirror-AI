// Emotion Detection Module
// Maps sentiment words and patterns to emotional categories

const emotionKeywords = {
  anxiety: ['anxious', 'nervous', 'worried', 'scared', 'afraid', 'panic', 'stress', 'tense', 'apprehensive', 'uneasy'],
  stress: ['stressed', 'overwhelmed', 'pressure', 'burden', 'exhausted', 'drained', 'frustrated', 'tense', 'strain'],
  sadness: ['sad', 'depressed', 'lonely', 'unhappy', 'blue', 'miserable', 'hopeless', 'grief', 'tears', 'gloomy'],
  happiness: ['happy', 'joyful', 'excited', 'glad', 'delighted', 'wonderful', 'amazing', 'fantastic', 'blessed', 'grateful'],
  anger: ['angry', 'furious', 'rage', 'irritated', 'annoyed', 'mad', 'frustrated', 'resentment', 'hate', 'disgusted'],
  fatigue: ['tired', 'exhausted', 'fatigued', 'worn out', 'burned out', 'drained', 'sleepy', 'energy low', 'lethargic']
};

const sentimentModifiers = {
  positive: ['very', 'so', 'extremely', 'really', 'incredibly', 'absolutely'],
  negative: ['not', 'no', 'never', 'neither', 'hardly']
};

function detectEmotions(text) {
  const lowercase = text.toLowerCase();
  const emotions = {};
  let totalScore = 0;

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    let score = 0;
    keywords.forEach(keyword => {
      if (lowercase.includes(keyword)) {
        score += 1;
      }
    });
    if (score > 0) {
      emotions[emotion] = score;
      totalScore += score;
    }
  }

  // Normalize scores
  const normalizedEmotions = {};
  for (const [emotion, score] of Object.entries(emotions)) {
    normalizedEmotions[emotion] = Math.round((score / (totalScore || 1)) * 100);
  }

  return normalizedEmotions;
}

function calculateSentimentScore(text) {
  const lowercase = text.toLowerCase();
  
  const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'love', 'happy', 'enjoyed', 'blessed', 'grateful', 'grateful'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'angry', 'sad', 'depressed', 'anxiety', 'worst', 'never'];

  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    positiveCount += (lowercase.match(new RegExp(word, 'g')) || []).length;
  });

  negativeWords.forEach(word => {
    negativeCount += (lowercase.match(new RegExp(word, 'g')) || []).length;
  });

  const total = positiveCount + negativeCount;
  if (total === 0) return 0;

  const sentiment = ((positiveCount - negativeCount) / total) * 100;
  return Math.round(sentiment);
}

function extractKeywords(text) {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might']);
  
  const words = text.toLowerCase().match(/\b[\w]+\b/g) || [];
  const keywords = words
    .filter(word => word.length > 4 && !commonWords.has(word))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(keywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword]) => keyword);
}

module.exports = {
  detectEmotions,
  calculateSentimentScore,
  extractKeywords
};
