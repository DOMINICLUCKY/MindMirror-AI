import React, { useState } from 'react';
import '../styles/ContactPage.css';

const ContactPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage({ type: 'error', text: '❌ Please fill in all required fields' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitMessage({ type: 'error', text: '❌ Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage for demo
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      setSubmitMessage({ 
        type: 'success', 
        text: '✅ Your message sent successfully! We\'ll respond within 24 hours.' 
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'normal'
      });

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000);
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: '❌ Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportChannels = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@mindmirrorai.com',
      details: 'Average response: 2 hours'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: '24/7 Available',
      details: 'Chat with our team instantly'
    },
    {
      icon: '📞',
      title: 'Support Hotline',
      description: '+1 (800) 123-4567',
      details: 'Available 9 AM - 9 PM EST'
    },
    {
      icon: '🐛',
      title: 'Bug Reports',
      description: 'bugs@mindmirrorai.com',
      details: 'Help us improve MindMirror'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <button className="contact-back-btn" onClick={onBack} title="Back">
            ← Back
          </button>
          <div className="contact-title-section">
            <h1>💬 Contact Support</h1>
            <p>We're here to help! Reach out with any questions or feedback</p>
          </div>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Category Select */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    disabled={isSubmitting}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="billing">Billing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                    disabled={isSubmitting}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're thinking..."
                  className="form-textarea"
                  rows="6"
                  disabled={isSubmitting}
                ></textarea>
                <p className="char-count">
                  {formData.message.length} / 2000 characters
                </p>
              </div>

              {/* Message Alert */}
              {submitMessage && (
                <div className={`message ${submitMessage.type}-message`}>
                  {submitMessage.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? '📤 Sending...' : '📤 Send Message'}
              </button>
            </form>
          </div>

          {/* Support Channels */}
          <div className="contact-channels-section">
            <h2>Other Ways to Reach Us</h2>
            <div className="support-channels">
              {supportChannels.map((channel, index) => (
                <div key={index} className="support-channel">
                  <div className="channel-icon">{channel.icon}</div>
                  <h3>{channel.title}</h3>
                  <p className="channel-info">{channel.description}</p>
                  <p className="channel-details">{channel.details}</p>
                </div>
              ))}
            </div>

            {/* FAQ Link */}
            <div className="contact-faq-link">
              <h3>💡 Before reaching out...</h3>
              <p>Check our FAQ page - your question might already be answered!</p>
              <button
                className="faq-link-btn"
                onClick={() => window.location.hash = '#faq'}
              >
                View FAQs →
              </button>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="contact-info">
          <h3>🌍 Service Coverage</h3>
          <p>
            We provide support in <strong>15+ languages</strong> across{' '}
            <strong>180+ countries</strong>. Our team is available 24/7 to assist you with
            any questions or issues.
          </p>
          <p className="contact-response-time">
            ⏱️ Typical response time: <strong>Under 2 hours</strong> for normal inquiries |{' '}
            <strong>30 minutes</strong> for urgent issues
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
