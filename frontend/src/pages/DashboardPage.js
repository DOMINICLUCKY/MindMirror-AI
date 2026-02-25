import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import API_BASE_URL from '../config/api';
import '../styles/DashboardPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DashboardPage({ onHome }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get userId from localStorage
      const userId = localStorage.getItem('mindmirror_user_id');
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/analysis/dashboard/${userId}`);
        if (response.data.success) {
          setDashboardData(response.data.dashboardData);
        }
      } catch (apiError) {
        // If backend is unavailable, use mock dashboard data
        console.warn('Backend unavailable, using mock dashboard data:', apiError.message);
        
        const mockDashboard = {
          totalEntries: 5,
          averageBurnoutScore: 62,
          currentRiskLevel: 'Moderate',
          overallSentiment: 35,
          recentTrend: [
            { date: '5 days ago', burnoutScore: 65, sentiment: 30 },
            { date: '4 days ago', burnoutScore: 58, sentiment: 40 },
            { date: '3 days ago', burnoutScore: 70, sentiment: 25 },
            { date: '2 days ago', burnoutScore: 55, sentiment: 45 },
            { date: 'Today', burnoutScore: 62, sentiment: 35 }
          ],
          emotionDistribution: {
            stressed: 28,
            tired: 35,
            anxious: 18,
            happy: 15,
            confused: 2,
            angry: 2
          },
          topKeywords: ['work', 'stress', 'health', 'mindfulness', 'sleep', 'exercise'],
          recentAnalyses: [
            {
              date: new Date().toLocaleDateString(),
              sentiment: 'Neutral-Positive',
              burnouScore: 62,
              recommendation: 'Take breaks regularly'
            },
            {
              date: new Date(Date.now() - 86400000).toLocaleDateString(),
              sentiment: 'Mixed',
              burnoutScore: 58,
              recommendation: 'Practice meditation'
            }
          ]
        };
        
        setDashboardData(mockDashboard);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score < 25) return '#4caf50';
    if (score < 50) return '#ff9800';
    if (score < 75) return '#ff5722';
    return '#d32f2f';
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  if (loading) {
    return <div className="dashboard-page"><p>Loading...</p></div>;
  }

  if (error || !dashboardData) {
    return (
      <div className="dashboard-page">
        <div className="error-container">
          <p>{error || 'No data available yet. Start by creating a journal entry!'}</p>
          <button onClick={onHome} className="back-btn">← Back to Home</button>
        </div>
      </div>
    );
  }

  // Chart data setup
  const burnoutTrendData = {
    labels: dashboardData.recentTrend.map(d => d.date),
    datasets: [{
      label: 'Burnout Score',
      data: dashboardData.recentTrend.map(d => d.burnoutScore),
      borderColor: '#ff5722',
      backgroundColor: 'rgba(255, 87, 34, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }]
  };

  const sentimentTrendData = {
    labels: dashboardData.recentTrend.map(d => d.date),
    datasets: [{
      label: 'Sentiment Score',
      data: dashboardData.recentTrend.map(d => d.sentiment),
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }]
  };

  const emotionDistributionData = {
    labels: Object.keys(dashboardData.emotionDistribution),
    datasets: [{
      label: 'Emotion Distribution',
      data: Object.values(dashboardData.emotionDistribution),
      backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe']
    }]
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <button onClick={onHome} className="back-btn">← Back to Home</button>

        <h2>📈 Your Mental Health Dashboard</h2>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Entries</h4>
            <p className="large-number">{dashboardData.totalEntries}</p>
          </div>

          <div className="summary-card">
            <h4>Average Burnout Score</h4>
            <p className="large-number" style={{ color: getRiskColor(dashboardData.averageBurnoutScore) }}>
              {dashboardData.averageBurnoutScore}%
            </p>
          </div>

          <div className="summary-card">
            <h4>Average Sentiment</h4>
            <p className="large-number" style={{ color: dashboardData.averageSentiment > 0 ? '#4caf50' : '#ff5722' }}>
              {dashboardData.averageSentiment > 0 ? '+' : ''}{dashboardData.averageSentiment}
            </p>
          </div>

          <div className="summary-card">
            <h4>Mood Trend</h4>
            <p className="trend-label">View graphs below</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-box">
            <h3>Burnout Score Trend</h3>
            <Line data={burnoutTrendData} options={chartOptions} />
          </div>

          <div className="chart-box">
            <h3>Sentiment Trend</h3>
            <Line data={sentimentTrendData} options={chartOptions} />
          </div>

          <div className="chart-box emotion-chart">
            <h3>Emotion Distribution</h3>
            <Pie data={emotionDistributionData} options={chartOptions} />
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="weekly-section">
          <h3>📅 Weekly Emotional Breakdown</h3>
          {dashboardData.weeklyData.length > 0 ? (
            <div className="weekly-entries">
              {dashboardData.weeklyData.map((entry, idx) => (
                <div key={idx} className="weekly-entry">
                  <h4>{entry.date}</h4>
                  <div className="emotion-summary">
                    {Object.entries(entry.emotions).map(([emotion, score]) => (
                      score > 0 && (
                        <span key={emotion} className={`emotion-badge emotion-${emotion}`}>
                          {emotion}: {score}%
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No weekly data available yet.</p>
          )}
        </div>

        {/* Insights */}
        <div className="insights-section">
          <div className="insight-card">
            <h3>📊 Key Insights</h3>
            <ul>
              <li>You have {dashboardData.totalEntries} journal {dashboardData.totalEntries === 1 ? 'entry' : 'entries'}</li>
              <li>Your average burnout score is {dashboardData.averageBurnoutScore}% - {dashboardData.averageBurnoutScore < 25 ? 'Good' : dashboardData.averageBurnoutScore < 50 ? 'Moderate' : 'High'} risk</li>
              <li>Your overall sentiment trend is {dashboardData.averageSentiment > 0 ? 'Positive' : 'Negative'}</li>
              <li>Most common emotion: {Object.entries(dashboardData.emotionDistribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
