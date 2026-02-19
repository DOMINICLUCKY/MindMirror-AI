import React, { useState, useMemo } from 'react';
import '../styles/DocumentationPage.css';

const DocumentationPage = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  const documentation = useMemo(() => ({
    'getting-started': {
      title: '🚀 Getting Started',
      icon: '🚀',
      sections: [
        {
          title: 'Creating Your First Journal Entry',
          content: [
            '1. Log in to your MindMirror account',
            '2. Click "New Entry" or navigate to Home',
            '3. Click the textarea and start typing your thoughts/feelings',
            '4. Use emotion templates for quick-start options',
            '5. Click "Analyze" to get AI insights',
            '',
            'Tips: Be honest and detailed. The more you write, the better our AI can understand your emotional patterns.'
          ]
        },
        {
          title: 'Understanding Your Emotion Score',
          content: [
            'Your emotion score represents your current emotional state on a -100 to +100 scale:',
            '',
            '⚪ +80 to +100: Excellent mood, peak wellbeing',
            '🟢 +50 to +79: Good mood, balanced emotions',
            '🟡 0 to +49: Neutral, mild concerns',
            '🟠 -25 to -1: Low mood, noticeable stress',
            '🔴 -50 to -25: Concerning, seek support',
            '🔴🔴 Below -50: Critical, immediate action needed',
            '',
            'The score is updated with each new journal entry.'
          ]
        },
        {
          title: 'What Happens After Analysis',
          content: [
            'When you submit a journal entry, MindMirror AI:',
            '',
            '1. Analyzes your text for emotional indicators',
            '2. Calculates sentiment and burnout risk',
            '3. Generates a detailed analysis report',
            '4. Provides personalized recommendations',
            '5. Updates your dashboard and statistics',
            '',
            'This process takes 2-3 seconds. Your data is completely private.'
          ]
        }
      ]
    },
    'features': {
      title: '✨ Features Guide',
      icon: '✨',
      sections: [
        {
          title: 'Dashboard Analytics',
          content: [
            'Your dashboard shows:',
            '',
            '📊 Emotion Distribution: Pie chart of your 6 emotions',
            '📈 Sentiment Trends: How your mood changes over time',
            '⚠️ Burnout Risk: Current risk percentage (0-100%)',
            '🎯 Weekly Insights: Key patterns from the past week',
            '💡 Recommendations: AI-generated wellness suggestions',
            '',
            'Data refreshes automatically when you add new entries.'
          ]
        },
        {
          title: 'Emotion Templates',
          content: [
            'Quick-start templates for common emotional states:',
            '',
            '😰 Stressed: For work pressure, deadline stress, overwhelm',
            '😴 Tired: For fatigue, low energy, exhaustion',
            '😨 Anxious: For worry, nervousness, apprehension',
            '😊 Happy: For joy, excitement, contentment',
            '🤔 Confused: For uncertainty, indecision, confusion',
            '😠 Angry: For frustration, irritation, anger',
            '',
            'Click a template to auto-fill your journal with emotion indicators.'
          ]
        },
        {
          title: 'AI Recommendations',
          content: [
            'Three levels of AI recommendations:',
            '',
            '⭐ Tier 1 - Immediate (Next few hours)',
            'Quick wellness activities: meditation, breathing exercises, short breaks',
            '',
            '⭐⭐ Tier 2 - Short-term (Next few days)',
            'Lifestyle changes: exercise increase, sleep schedule, social connection',
            '',
            '⭐⭐⭐ Tier 3 - Long-term (Professional support)',
            'Therapy referral, counseling, medical checkup recommendations',
            '',
            'Adjust these settings in your Profile.'
          ]
        },
        {
          title: 'Profile Management',
          content: [
            'Update your profile to:',
            '',
            '👤 Change name, email, or phone number',
            '🎂 Update age and birthday',
            '🎯 Set personal wellness goals',
            '🎨 Customize recommendation preferences',
            '📊 View your achievement badges',
            '📈 Check your wellness statistics',
            '',
            'All changes are saved automatically to your account.'
          ]
        }
      ]
    },
    'advanced': {
      title: '⚙️ Advanced Topics',
      icon: '⚙️',
      sections: [
        {
          title: 'Understanding Burnout Calculation',
          content: [
            'Burnout Risk = (Sentiment × 0.4) + (Stress/Anxiety × 0.3) + ',
            '              (Fatigue × 0.2) + (Trend × 0.1)',
            '',
            'Factors considered:',
            '• Sentiment Score: Overall positive/negative mood',
            '• Stress Levels: Explicit stress indicators in text',
            '• Anxiety Markers: Fear, worry, nervousness',
            '• Fatigue: Energy level and tiredness mentions',
            '• Historical Trend: Worsening or improving pattern',
            '',
            'Regular journaling lets our AI track your trajectory.'
          ]
        },
        {
          title: 'Privacy & Data Security',
          content: [
            'MindMirror uses enterprise-grade security:',
            '',
            '🔒 SSL/TLS Encryption: All data in transit',
            '🔐 AES-256 Encryption: All data at rest',
            '🛡️ Two-Factor Authentication: Optional security layer',
            '✅ GDPR Compliant: Your rights are protected',
            '📋 Regular Audits: Third-party security checks',
            '',
            'You can export or delete your data anytime.',
          ]
        },
        {
          title: 'Exporting Your Data',
          content: [
            'To download all your data:',
            '',
            '1. Go to Settings > Data & Privacy',
            '2. Click "Download All My Data"',
            '3. Confirm your password',
            '4. Receive email with download link (24 hours)',
            '5. ZIP contains JSON, CSV, and PDF formats',
            '',
            'Data includes: Entries, scores, achievements, settings'
          ]
        },
        {
          title: 'Integrations',
          content: [
            'Coming soon: MindMirror integrations',
            '',
            '⌚ Wearable Devices: Heart rate, sleep tracking',
            '📱 Health Apps: Apple Health, Google Fit sync',
            '🔔 Calendar Integration: Burnout prediction alerts',
            '📧 Email Reminders: Daily journal prompts',
            '🎵 Music Integration: Emotional playlists',
            '',
            'These will help create a holistic wellness picture.'
          ]
        }
      ]
    },
    'troubleshooting': {
      title: '🔧 Troubleshooting',
      icon: '🔧',
      sections: [
        {
          title: 'Common Issues & Solutions',
          content: [
            '❌ "Incorrect password" error',
            'Solution: Check CAPS LOCK, reenter carefully, or reset password',
            '',
            '❌ Charts not displaying',
            'Solution: Refresh page, clear cache, try another browser',
            '',
            '❌ Analysis taking too long',
            'Solution: Check internet connection, wait 30s, try again',
            '',
            '❌ Data not syncing',
            'Solution: Log out/in on all devices, check connection',
            '',
            '❌ Notifications not working',
            'Solution: Check Settings > Notifications, verify email/phone'
          ]
        },
        {
          title: 'Performance Tips',
          content: [
            'For best performance:',
            '',
            '🚀 Keep browser updated to latest version',
            '🧹 Clear cookies/cache monthly',
            '⚡ Close unused browser tabs',
            '🔌 Ensure stable internet (2+ Mbps)',
            '📵 Disable unnecessary extensions',
            '⏰ Use MindMirror during off-peak hours',
            '',
            'Mobile: Keep 1GB+ free storage space'
          ]
        }
      ]
    },
    'api': {
      title: '🔗 API Documentation',
      icon: '🔗',
      sections: [
        {
          title: 'API Overview',
          content: [
            'MindMirror API lets developers integrate emotion analysis:',
            '',
            'Base URL: https://api.mindmirrorai.com/v1',
            'Authentication: Bearer token (OAuth 2.0)',
            'Rate Limit: 100 requests/minute for free tier',
            'Response Format: JSON',
            '',
            'Full API docs: https://docs.mindmirrorai.com/api'
          ]
        },
        {
          title: 'Key Endpoints',
          content: [
            'POST /analyze - Analyze text for emotions',
            'POST /journal - Create journal entry',
            'GET /journal/:id - Retrieve entry',
            'GET /analytics - Get user analytics',
            'POST /recommendations - Get AI recommendations',
            'GET /profile - Get user profile',
            '',
            'See full documentation for parameters and responses'
          ]
        }
      ]
    }
  }), []);

  const categories = [
    { id: 'getting-started', label: '🚀 Getting Started', icon: '🚀' },
    { id: 'features', label: '✨ Features', icon: '✨' },
    { id: 'advanced', label: '⚙️ Advanced', icon: '⚙️' },
    { id: 'troubleshooting', label: '🔧 Troubleshooting', icon: '🔧' },
    { id: 'api', label: '🔗 API Docs', icon: '🔗' }
  ];

  const currentDoc = documentation[selectedCategory];

  const filteredSections = useMemo(() => {
    if (!searchTerm) return currentDoc.sections;

    const term = searchTerm.toLowerCase();
    return currentDoc.sections.filter(section =>
      section.title.toLowerCase().includes(term) ||
      section.content.some(line => line.toLowerCase().includes(term))
    );
  }, [searchTerm, currentDoc.sections]);

  return (
    <div className="docs-page">
      <div className="docs-container">
        {/* Header */}
        <div className="docs-header">
          <button className="docs-back-btn" onClick={onBack} title="Back">
            ← Back
          </button>
          <div className="docs-title-section">
            <h1>📖 Documentation</h1>
            <p>Complete guides and tutorials for MindMirror AI</p>
          </div>
        </div>

        <div className="docs-layout">
          {/* Sidebar */}
          <div className="docs-sidebar">
            <div className="categories-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchTerm('');
                  }}
                  title={category.label}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>

            <div className="docs-search">
              <input
                type="text"
                className="docs-search-input"
                placeholder="🔍 Search docs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="docs-content">
            <h2>{currentDoc.title}</h2>

            {filteredSections.length > 0 ? (
              <div className="docs-sections">
                {filteredSections.map((section, index) => (
                  <div key={index} className="docs-section">
                    <h3>{section.title}</h3>
                    <div className="docs-section-content">
                      {section.content.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="docs-no-results">
                <p>❌ No documentation found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Help CTA */}
        <div className="docs-cta">
          <h3>💡 Need more help?</h3>
          <p>Visit our FAQ page or contact support directly</p>
          <div className="docs-cta-buttons">
            <button className="docs-cta-btn" onClick={() => window.location.hash = '#faq'}>
              View FAQs
            </button>
            <button className="docs-cta-btn" onClick={() => window.location.hash = '#contact'}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
