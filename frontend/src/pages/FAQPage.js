import React, { useState, useMemo } from 'react';
import '../styles/FAQPage.css';

const FAQPage = ({ onBack }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = useMemo(() => [
    {
      category: 'Getting Started',
      items: [
        {
          question: '🚀 What is MindMirror AI?',
          answer: 'MindMirror AI is an advanced emotional health and burnout prediction platform that uses artificial intelligence to analyze your emotional patterns, detect early signs of burnout, and provide personalized recommendations for mental wellness. Our technology combines NLP (Natural Language Processing) with psychological research to give you actionable insights about your emotional health.'
        },
        {
          question: '🎯 How does the emotion detection work?',
          answer: 'When you journal your thoughts and feelings, our AI analyzes the text to identify 6 core emotional states: stressed, tired, anxious, happy, confused, and angry. The system evaluates sentiment patterns, stress indicators, and emotional frequency to create a comprehensive emotional profile. This analysis helps predict burnout risk and recommend personalized coping strategies.'
        },
        {
          question: '📝 Do I need to journal daily?',
          answer: 'While daily journaling provides the most accurate insights, you can use MindMirror AI at your own pace. Even 2-3 entries per week can help identify emotional patterns. More frequent entries (daily or multiple times per day) will give you better predictions and more personalized recommendations.'
        },
        {
          question: '🔐 Is my data private and secure?',
          answer: 'Yes! Your privacy is our top priority. All journal entries are encrypted and stored securely on our servers. We never share your personal data with third parties. You can delete your account and all associated data at any time from the Settings page.'
        }
      ]
    },
    {
      category: 'Features & Analytics',
      items: [
        {
          question: '📊 What do the burnout metrics mean?',
          answer: 'Our burnout score (0-100%) is calculated using multiple factors: sentiment trends (40%), stress/anxiety levels (30%), fatigue indicators (20%), and historical patterns (10%). A score above 70% indicates critical burnout risk and we recommend seeking professional help. Below 50% suggests healthy emotional balance.'
        },
        {
          question: '💡 What are AI recommendations?',
          answer: 'Based on your emotional patterns, our AI generates 3-tier recommendations: Tier 1 are immediate wellness activities (meditation, breaks), Tier 2 are lifestyle changes (exercise, sleep), and Tier 3 are professional support suggestions (therapy, counseling). Recommendations update with new journal entries.'
        },
        {
          question: '📈 How accurate is the emotion detection?',
          answer: 'Our AI achieves 85%+ accuracy in emotion detection after analyzing thousands of anonymized journal entries. However, it works best when you\'re honest and detailed in your entries. The system learns your personal emotional patterns over time, improving accuracy with more data.'
        },
        {
          question: '🎨 What does the dashboard show?',
          answer: 'The dashboard displays: Emotion frequency pie chart, Sentiment trend over time, Weekly burnout risk, Recommended actions, and Personal wellness statistics. Charts update automatically as you add new journal entries.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      items: [
        {
          question: '🔄 How do I change my password?',
          answer: 'Go to Settings > Account Security > Change Password. You\'ll need to verify your current password before setting a new one. Passwords must be at least 8 characters with a mix of uppercase, lowercase, and numbers for security.'
        },
        {
          question: '🌙 What is dark mode?',
          answer: 'Dark mode reduces eye strain during night journaling sessions by using darker backgrounds and lighter text. Toggle it on/off in Settings > Display > Dark Mode. Your preference is saved automatically across all devices when you\'re logged in.'
        },
        {
          question: '🔔 How do I manage notifications?',
          answer: 'Visit Settings > Notifications to customize: daily reminder times, burnout alerts, achievement notifications, and website updates. You can enable/disable any notification type and set preferred delivery times.'
        },
        {
          question: '📱 Can I use MindMirror on mobile?',
          answer: 'MindMirror AI is fully responsive and works on all devices (phones, tablets, computers). Simply log in to your account from any device. Your data syncs instantly, so you can journal from wherever you are.'
        }
      ]
    },
    {
      category: 'Data & Privacy',
      items: [
        {
          question: '🗑️ How do I delete my account?',
          answer: 'Go to Settings > Account > Delete Account. You\'ll need to confirm your password. All your data, including journal entries and profile information, will be permanently deleted within 30 days. This action cannot be undone.'
        },
        {
          question: '📥 Can I export my data?',
          answer: 'Yes! Go to Settings > Data Export > Download My Data. You\'ll receive a ZIP file containing all your journal entries, analytics, and account information in standard formats (JSON, CSV). This happens within 24 hours.'
        },
        {
          question: '👥 Do you use my data for research?',
          answer: 'We use anonymized, aggregated data to improve our AI models and burnout detection accuracy. Your identified personal data is NEVER used for research without explicit consent. You can opt-out in Settings > Privacy > Research Participation.'
        },
        {
          question: '🛡️ What security measures do you use?',
          answer: 'We use bank-level encryption (SSL/TLS), regular security audits, GDPR compliance, two-factor authentication options, and secure password hashing. Our infrastructure is hosted on AWS with automatic backups and disaster recovery.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      items: [
        {
          question: '❌ I forgot my password. What do I do?',
          answer: 'Click the "Forgot Password?" link on the login page. Enter your email or phone number. You\'ll receive a password reset link. If you don\'t see the email, check your spam folder. The link expires in 24 hours.'
        },
        {
          question: '⚠️ Charts are not loading. How do I fix this?',
          answer: 'Try refreshing the page (F5). Clear your browser cache if that doesn\'t work. Make sure JavaScript is enabled. If charts still don\'t load, try a different browser. Contact support if the issue persists.'
        },
        {
          question: '⏱️ The app is running slowly. How can I speed it up?',
          answer: 'Close other browser tabs, clear cache (Settings > Storage > Clear Cache), disable browser extensions, or update to the latest browser version. Check your internet connection speed too - minimum 2 Mbps recommended.'
        },
        {
          question: '🔗 The app is not syncing across devices. What\'s wrong?',
          answer: 'Make sure you\'re logged into the same account on all devices. Check your internet connection. Log out and log back in on the problematic device. If sync still fails, contact support with your account ID.'
        }
      ]
    },
    {
      category: 'Premium & Support',
      items: [
        {
          question: '💰 Is MindMirror AI free?',
          answer: 'MindMirror AI is currently free during our beta phase! When we launch premium features, basic emotional tracking and burnout detection will remain free forever. Advanced analytics and personalized coaching will be available in premium tiers.'
        },
        {
          question: '📞 How do I contact support?',
          answer: 'Visit our Contact Support page or email support@mindmirrorai.com. You can also use the 24/7 live chat on the website. For urgent issues, call our support hotline. Average response time is under 2 hours.'
        },
        {
          question: '🎓 Is there training for new users?',
          answer: 'Yes! Visit our Documentation page for detailed guides on every feature. We offer video tutorials, step-by-step walkthroughs, and tips for getting the most out of MindMirror AI. New users also get an interactive onboarding tour.'
        },
        {
          question: '🏥 Should I use this instead of therapy?',
          answer: 'MindMirror AI is a wellness tool, not a replacement for professional mental health care. If you\'re experiencing severe depression, anxiety, or suicidal thoughts, please seek help from a licensed therapist or crisis hotline immediately. We can supplement professional care but never replace it.'
        }
      ]
    }
  ], []);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    
    const term = searchTerm.toLowerCase();
    return faqs.map(category => ({
      ...category,
      items: category.items.filter(
        item => 
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term)
      )
    })).filter(category => category.items.length > 0);
  }, [searchTerm, faqs]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <button className="faq-back-btn" onClick={onBack} title="Back">
            ← Back
          </button>
          <div className="faq-title-section">
            <h1>📚 Frequently Asked Questions</h1>
            <p>Find answers to common questions about MindMirror AI</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="faq-search-container">
          <input
            type="text"
            className="faq-search-input"
            placeholder="🔍 Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="faq-clear-search"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* FAQ Categories and Items */}
        <div className="faq-content">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h2 className="faq-category-title">{category.category}</h2>
                <div className="faq-items">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`faq-item ${
                        expandedIndex === `${categoryIndex}-${itemIndex}` ? 'expanded' : ''
                      }`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleExpand(`${categoryIndex}-${itemIndex}`)}
                      >
                        <span className="faq-question-text">{item.question}</span>
                        <span className="faq-toggle-icon">
                          {expandedIndex === `${categoryIndex}-${itemIndex}` ? '▼' : '▶'}
                        </span>
                      </button>
                      {expandedIndex === `${categoryIndex}-${itemIndex}` && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="faq-no-results">
              <p>❌ No FAQs found matching "{searchTerm}"</p>
              <p className="faq-no-results-hint">Try different search terms</p>
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="faq-contact-cta">
          <h3>💬 Still need help?</h3>
          <p>Can't find what you're looking for? Contact our support team!</p>
          <button className="faq-contact-btn" onClick={() => window.location.hash = '#contact'}>
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
