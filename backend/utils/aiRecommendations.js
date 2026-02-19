// AI Recommendations Engine
// Generates personalized psychological recommendations based on analysis

const recommendationTemplates = {
  anxiety: [
    'Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
    'Practice deep breathing exercises - try the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8',
    'Consider a 10-minute meditation session using apps like Headspace or Calm',
    'Take a short walk in nature to help ground yourself in the present moment'
  ],
  stress: [
    'Break your tasks into smaller, manageable chunks and celebrate small wins',
    'Set clear boundaries between work and personal time',
    'Practice progressive muscle relaxation for 15 minutes',
    'Engage in a hobby or activity you enjoy to decompress',
    'Try the Pomodoro technique: work for 25 minutes, then take a 5-minute break'
  ],
  sadness: [
    'Reach out to someone you trust and share how you\'re feeling',
    'Engage in physical activity - even a 20-minute walk can boost mood',
    'Practice self-compassion: speak to yourself as you would a good friend',
    'Spend time with people who uplift you',
    'Consider talking to a therapist or counselor'
  ],
  fatigue: [
    'Prioritize sleep: aim for 7-9 hours each night',
    'Take screen breaks every hour to reduce eye strain',
    'Stay hydrated throughout the day',
    'Do light stretching or yoga to reinvigorate your energy',
    'Consider if you need a day to rest and recover'
  ],
  anger: [
    'Take a time-out to cool down before responding',
    'Channel emotions through physical activity like exercise or sports',
    'Practice the TIPP technique: Temperature (cold water), Intense exercise, Paced breathing, Pair muscle relaxation',
    'Journal about what triggered your anger to understand the root cause',
    'Use "I" statements when expressing your feelings to others'
  ]
};

const lifestyleStrategies = [
  'Maintain a consistent sleep schedule (go to bed and wake up at the same time)',
  'Exercise for at least 30 minutes, 3-4 times per week',
  'Eat nutritious meals with balanced macronutrients',
  'Limit caffeine and alcohol intake',
  'Schedule regular breaks throughout your day',
  'Maintain social connections with friends and family',
  'Practice mindfulness or meditation daily',
  'Disconnect from work during personal time',
  'Keep a gratitude journal - write 3 things you are grateful for daily',
  'Seek professional help if feeling overwhelmed'
];

function generatePersonalizedRecommendations(emotionData, burnoutScore) {
  const recommendations = {
    immediate: [],
    daily: [],
    longterm: []
  };

  // Immediate actions (for high emotions)
  const highEmotions = Object.entries(emotionData)
    .filter(([_, score]) => score > 25)
    .sort((a, b) => b[1] - a[1])
    .map(([emotion, _]) => emotion);

  highEmotions.forEach(emotion => {
    if (recommendationTemplates[emotion]) {
      const strategies = recommendationTemplates[emotion];
      recommendations.immediate.push(strategies[Math.floor(Math.random() * strategies.length)]);
    }
  });

  // Daily practices
  if (burnoutScore > 50) {
    recommendations.daily.push(
      'Spend 10 minutes on mindfulness or meditation',
      'Take a 15-minute nature break',
      'Check in with your emotions at morning and evening'
    );
  } else {
    recommendations.daily.push(
      'Maintain your current coping strategies',
      'Continue with stress management techniques'
    );
  }

  // Long-term strategies
  recommendations.longterm = [
    lifestyleStrategies[Math.floor(Math.random() * lifestyleStrategies.length)],
    lifestyleStrategies[Math.floor(Math.random() * lifestyleStrategies.length)]
  ];

  // Remove duplicates
  recommendations.immediate = [...new Set(recommendations.immediate)];
  recommendations.daily = [...new Set(recommendations.daily)];

  return recommendations;
}

function generatePsychologicalSummary(emotionData, sentimentScore, keywords) {
  let summary = '';

  const dominantEmotion = Object.entries(emotionData)
    .sort((a, b) => b[1] - a[1])[0];

  if (dominantEmotion) {
    const [emotion, score] = dominantEmotion;
    summary += `Your journal entry shows a significant presence of ${emotion} (${score}%). `;
  }

  if (sentimentScore > 20) {
    summary += 'Overall, your mood appears positive with optimistic undertones. ';
  } else if (sentimentScore > 0) {
    summary += 'Your overall sentiment is slightly positive, with moments of challenge. ';
  } else if (sentimentScore > -20) {
    summary += 'Your entry reflects some negative emotions, but there is room for improvement. ';
  } else {
    summary += 'Your entry contains predominantly negative sentiments that deserve attention. ';
  }

  if (keywords.length > 0) {
    summary += `Key themes in your entry include: ${keywords.slice(0, 3).join(', ')}. `;
  }

  summary += 'Remember, feelings are temporary, and you have the strength to navigate through them.';

  return summary;
}

module.exports = {
  generatePersonalizedRecommendations,
  generatePsychologicalSummary,
  recommendationTemplates,
  lifestyleStrategies
};
