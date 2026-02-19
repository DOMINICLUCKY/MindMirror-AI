import React, { useMemo } from 'react';
import '../styles/AnalysisPage.css';

const AnalysisPage = React.memo(function AnalysisPage({ result, onBack }) {
  const recommendations = result.recommendations;

  const memoizedEmotions = useMemo(() => Object.entries(result.emotions), [result.emotions]);
  const memoizedRisks = useMemo(() => result.riskAnalysis.primaryConcerns, [result.riskAnalysis]);
  const memoizedStrengths = useMemo(() => result.riskAnalysis.strengths, [result.riskAnalysis]);
  const memoizedKeywords = useMemo(() => result.keywords, [result.keywords]);
  const memoizedRecommendations = useMemo(() => recommendations, [recommendations]);

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <button onClick={onBack} className="back-btn">← Back to Home</button>

        <h2>📊 Your Emotional Analysis</h2>

        {/* Burnout Score Section */}
        <div className="burnout-section">
          <div className={`burnout-card ${result.riskAnalysis.riskLevel.level.toLowerCase()}`}>
            <h3>Burnout Risk Score</h3>
            <div className="score-display">
              <div className="circular-progress">
                <div className="score-text">{result.burnoutScore}%</div>
              </div>
            </div>
            <div className="risk-indicator" style={{ backgroundColor: result.riskAnalysis.riskLevel.color }}>
              Risk Level: <strong>{result.riskAnalysis.riskLevel.level}</strong>
            </div>
            <p className="risk-message">{result.riskAnalysis.riskLevel.recommendation}</p>
          </div>
        </div>

        {/* Psychological Summary */}
        <div className="summary-section">
          <div className="summary-card">
            <h3>💭 Psychological Summary</h3>
            <p>{result.psychologicalSummary}</p>
          </div>
        </div>

        {/* Emotions Analysis */}
        <div className="emotions-section">
          <h3>Detected Emotions</h3>
          <div className="emotions-grid">
            {memoizedEmotions.map(([emotion, score]) => (
              <div key={emotion} className="emotion-bar">
                <label>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</label>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill emotion-${emotion}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <span className="score">{score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="sentiment-section">
          <div className="sentiment-card">
            <h3>Overall Sentiment</h3>
            <div className={`sentiment-display ${result.sentiment.label.toLowerCase().replace(/ /g, '-')}`}>
              <div className="sentiment-score">{result.sentiment.score > 0 ? '+' : ''}{result.sentiment.score}</div>
              <div className="sentiment-label">{result.sentiment.label}</div>
            </div>
          </div>
        </div>

        {/* Concerns and Strengths */}
        <div className="concerns-section">
          <div className="concern-box">
            <h3>⚠️ Primary Concerns</h3>
            <ul className="concerns-list">
              {memoizedRisks.map((concern, idx) => (
                <li key={idx}>{concern}</li>
              ))}
            </ul>
          </div>

          <div className="strength-box">
            <h3>💪 Your Strengths</h3>
            <ul className="strengths-list">
              {memoizedStrengths.length > 0 ? (
                memoizedStrengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))
              ) : (
                <li>Focus on building positive patterns</li>
              )}
            </ul>
          </div>
        </div>

        {/* Key Themes */}
        <div className="keywords-section">
          <h3>🔑 Key Themes in Your Entry</h3>
          <div className="keywords-list">
            {memoizedKeywords.map((keyword, idx) => (
              <span key={idx} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations-section">
          <h3>💡 Personalized Recommendations</h3>

          <div className="recommendation-category">
            <h4>🚀 Immediate Actions</h4>
            <ul className="recommendation-list">
              {memoizedRecommendations.immediate.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="recommendation-category">
            <h4>📅 Daily Practices</h4>
            <ul className="recommendation-list">
              {memoizedRecommendations.daily.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="recommendation-category">
            <h4>🎯 Long-term Strategies</h4>
            <ul className="recommendation-list">
              {memoizedRecommendations.longterm.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="support-section">
          <div className="support-card">
            <h3>Need Support?</h3>
            <p>If you're experiencing severe stress or mental health concerns, please reach out to:</p>
            <ul>
              <li>National Mental Health Helpline</li>
              <li>Campus Counseling Services</li>
              <li>Licensed Mental Health Professional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AnalysisPage;
