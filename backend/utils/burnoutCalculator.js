// Burnout Risk Calculator
// Calculates burnout probability based on multiple factors

function calculateBurnoutScore(emotionData, sentimentScore, journalHistory = []) {
  let burnoutScore = 0;

  // Factor 1: Negative sentiment frequency (40% weight)
  const negativeSentimentWeight = 40;
  if (sentimentScore < -30) {
    burnoutScore += negativeSentimentWeight * 0.9;
  } else if (sentimentScore < -10) {
    burnoutScore += negativeSentimentWeight * 0.5;
  } else if (sentimentScore < 0) {
    burnoutScore += negativeSentimentWeight * 0.2;
  }

  // Factor 2: High stress and anxiety indicators (30% weight)
  const stressAnxietyWeight = 30;
  const stressLevel = (emotionData.stress || 0) + (emotionData.anxiety || 0);
  if (stressLevel > 40) {
    burnoutScore += stressAnxietyWeight * 0.9;
  } else if (stressLevel > 25) {
    burnoutScore += stressAnxietyWeight * 0.6;
  } else if (stressLevel > 10) {
    burnoutScore += stressAnxietyWeight * 0.3;
  }

  // Factor 3: Fatigue indicators (20% weight)
  const fatigueWeight = 20;
  const fatigueLevel = emotionData.fatigue || 0;
  if (fatigueLevel > 25) {
    burnoutScore += fatigueWeight * 0.9;
  } else if (fatigueLevel > 15) {
    burnoutScore += fatigueWeight * 0.6;
  } else if (fatigueLevel > 5) {
    burnoutScore += fatigueWeight * 0.3;
  }

  // Factor 4: Patterns over time (10% weight) - if history exists
  if (journalHistory.length > 0) {
    const recentTrend = calculateTrendPattern(journalHistory);
    const trendWeight = 10;
    if (recentTrend === 'declining') {
      burnoutScore += trendWeight * 0.8;
    } else if (recentTrend === 'stagnant') {
      burnoutScore += trendWeight * 0.4;
    }
  }

  // Cap the score at 100
  return Math.min(burnoutScore, 100);
}

function calculateTrendPattern(journalHistory) {
  if (journalHistory.length < 3) return 'insufficient';

  const recentThree = journalHistory.slice(-3);
  const sentiments = recentThree.map(entry => entry.sentimentScore);

  const avg1 = sentiments.slice(0, 2).reduce((a, b) => a + b) / 2;
  const latest = sentiments[2];

  if (latest < avg1 - 15) return 'declining';
  if (Math.abs(latest - avg1) < 10) return 'stagnant';
  return 'improving';
}

function getRiskLevel(burnoutScore) {
  if (burnoutScore < 25) return { level: 'Low', color: '#4caf50', recommendation: 'Keep maintaining healthy habits' };
  if (burnoutScore < 50) return { level: 'Moderate', color: '#ff9800', recommendation: 'Consider taking breaks and practicing stress management' };
  if (burnoutScore < 75) return { level: 'High', color: '#ff5722', recommendation: 'Seek support and prioritize self-care immediately' };
  return { level: 'Critical', color: '#d32f2f', recommendation: 'Please reach out to mental health professionals' };
}

function generateRiskAnalysis(emotionData, sentimentScore, burnoutScore) {
  const analysis = {
    burnoutScore: Math.round(burnoutScore),
    riskLevel: getRiskLevel(burnoutScore),
    primaryConcerns: [],
    strengths: []
  };

  // Identify primary concerns
  if ((emotionData.stress || 0) > 25) analysis.primaryConcerns.push('High stress levels');
  if ((emotionData.anxiety || 0) > 25) analysis.primaryConcerns.push('Elevated anxiety');
  if ((emotionData.fatigue || 0) > 20) analysis.primaryConcerns.push('Significant fatigue');
  if (sentimentScore < -20) analysis.primaryConcerns.push('Persistent negative thoughts');
  if ((emotionData.sadness || 0) > 20) analysis.primaryConcerns.push('Mood disturbance');

  // Identify strengths
  if ((emotionData.happiness || 0) > 15) analysis.strengths.push('Moments of joy and positivity');
  if (sentimentScore > 0) analysis.strengths.push('Overall positive outlook');
  if ((emotionData.anger || 0) < 10) analysis.strengths.push('Good emotional regulation');

  if (analysis.primaryConcerns.length === 0) {
    analysis.primaryConcerns.push('Monitor overall wellbeing');
  }

  return analysis;
}

module.exports = {
  calculateBurnoutScore,
  getRiskLevel,
  generateRiskAnalysis,
  calculateTrendPattern
};
