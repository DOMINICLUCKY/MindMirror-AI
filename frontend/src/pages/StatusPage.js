import React, { useState, useEffect, useMemo } from 'react';
import '../styles/StatusPage.css';

const StatusPage = ({ onBack }) => {
  const [stats, setStats] = useState({
    uptime: '99.98%',
    responseTime: '145ms',
    activeUsers: '12,450',
    totalRequests: '2.3B'
  });

  // Simulate live status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        responseTime: `${Math.floor(Math.random() * 50 + 100)}ms`,
        activeUsers: `${Math.floor(Math.random() * 5000 + 10000)}`
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = useMemo(() => [
    {
      name: 'API Server',
      emoji: '🔌',
      status: 'Operational',
      uptime: '99.99%',
      lastIncident: '15 days ago',
      responseTime: '120ms'
    },
    {
      name: 'Database',
      emoji: '💾',
      status: 'Operational',
      uptime: '99.98%',
      lastIncident: '8 days ago',
      responseTime: 'N/A'
    },
    {
      name: 'WebSocket Service',
      emoji: '🔗',
      status: 'Operational',
      uptime: '99.95%',
      lastIncident: '3 days ago',
      responseTime: '215ms'
    },
    {
      name: 'Email Service',
      emoji: '📧',
      status: 'Operational',
      uptime: '99.97%',
      lastIncident: '5 days ago',
      responseTime: '850ms'
    },
    {
      name: 'Analytics Engine',
      emoji: '📊',
      status: 'Operational',
      uptime: '99.99%',
      lastIncident: '22 days ago',
      responseTime: '340ms'
    },
    {
      name: 'AI Analysis Service',
      emoji: '🤖',
      status: 'Operational',
      uptime: '99.96%',
      lastIncident: '10 days ago',
      responseTime: '2.1s'
    }
  ], []);

  const incidents = useMemo(() => [
    {
      date: 'March 15, 2024',
      time: '14:30 UTC',
      title: 'Brief API Latency',
      duration: '12 minutes',
      impact: 'Some users experienced slower analysis',
      status: 'Resolved',
      emoji: '✅'
    },
    {
      date: 'March 12, 2024',
      time: '09:15 UTC',
      title: 'Database Maintenance',
      duration: '8 minutes',
      impact: 'Scheduled maintenance window',
      status: 'Planned',
      emoji: '🔧'
    },
    {
      date: 'March 8, 2024',
      time: '22:45 UTC',
      title: 'Email Delivery Delay',
      duration: '25 minutes',
      impact: 'Password reset emails delayed',
      status: 'Resolved',
      emoji: '✅'
    },
    {
      date: 'February 28, 2024',
      time: '16:20 UTC',
      title: 'WebSocket Connection Issue',
      duration: '3 minutes',
      impact: 'Real-time notifications briefly unavailable',
      status: 'Resolved',
      emoji: '✅'
    }
  ], []);

  const metrics = useMemo(() => [
    {
      label: 'System Uptime',
      value: stats.uptime,
      icon: '⬆️',
      trend: 'Excellent'
    },
    {
      label: 'Avg Response Time',
      value: stats.responseTime,
      icon: '⚡',
      trend: 'Good'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: '👥',
      trend: 'Growing'
    },
    {
      label: 'Total Requests',
      value: stats.totalRequests,
      icon: '📤',
      trend: '↑ +12%'
    }
  ], [stats]);

  return (
    <div className="status-page">
      <div className="status-container">
        {/* Header */}
        <div className="status-header">
          <button className="status-back-btn" onClick={onBack} title="Back">
            ← Back
          </button>
          <div className="status-title-section">
            <h1>📡 System Status</h1>
            <p>Real-time status and incident history for MindMirror AI</p>
          </div>
        </div>

        {/* Overall Status */}
        <div className="overall-status">
          <div className="status-indicator operational">
            <span className="status-pulse"></span>
            <span className="status-label">All Systems Operational</span>
          </div>
          <p className="status-message">
            ✅ MindMirror AI is running normally. Last updated: Just now
          </p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-icon">{metric.icon}</div>
              <h3>{metric.label}</h3>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-trend">{metric.trend}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="services-section">
          <h2>🔧 Service Status</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card operational">
                <div className="service-header">
                  <span className="service-indicator"></span>
                  <span className="service-emoji">{service.emoji}</span>
                  <h3>{service.name}</h3>
                </div>
                <div className="service-details">
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="status-badge operational">{service.status}</span>
                  </p>
                  <p>
                    <strong>Uptime:</strong> {service.uptime}
                  </p>
                  <p>
                    <strong>Response Time:</strong> {service.responseTime}
                  </p>
                  <p>
                    <strong>Last Incident:</strong> {service.lastIncident}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History */}
        <div className="incidents-section">
          <h2>📋 Recent Incidents</h2>
          <div className="incidents-list">
            {incidents.length > 0 ? (
              incidents.map((incident, index) => (
                <div key={index} className="incident-item">
                  <div className="incident-badge">{incident.emoji}</div>
                  <div className="incident-details">
                    <h3>{incident.title}</h3>
                    <p className="incident-time">
                      {incident.date} at {incident.time}
                    </p>
                    <p className="incident-impact">{incident.impact}</p>
                  </div>
                  <div className="incident-meta">
                    <span className="incident-status">{incident.status}</span>
                    <span className="incident-duration">{incident.duration}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-incidents">
                <p>✅ No incidents reported in the last 30 days</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Graph Placeholder */}
        <div className="performance-section">
          <h2>📊 30-Day Performance</h2>
          <div className="performance-card">
            <div className="performance-graph">
              <div className="graph-bar" style={{ height: '95%' }}></div>
              <div className="graph-bar" style={{ height: '98%' }}></div>
              <div className="graph-bar" style={{ height: '99%' }}></div>
              <div className="graph-bar" style={{ height: '97%' }}></div>
              <div className="graph-bar" style={{ height: '99.5%' }}></div>
              <div className="graph-bar" style={{ height: '98.5%' }}></div>
              <div className="graph-bar" style={{ height: '99.8%' }}></div>
              <div className="graph-bar" style={{ height: '99%' }}></div>
              <div className="graph-bar" style={{ height: '99.2%' }}></div>
              <div className="graph-bar" style={{ height: '98.8%' }}></div>
            </div>
            <p className="performance-note">Average Uptime: 98.8%</p>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="subscribe-section">
          <h3>🔔 Get Status Updates</h3>
          <p>Subscribe to status alerts and incident notifications</p>
          <div className="subscribe-options">
            <button className="subscribe-btn">Email Updates</button>
            <button className="subscribe-btn">SMS Alerts</button>
            <button className="subscribe-btn">RSS Feed</button>
            <button className="subscribe-btn">Slack Integration</button>
          </div>
        </div>

        {/* Support Contact */}
        <div className="status-support">
          <h3>💬 Need Help?</h3>
          <p>
            If you encounter any issues not listed above, please{' '}
            <button
              className="contact-link"
              onClick={() => window.location.hash = '#contact'}
            >
              contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
