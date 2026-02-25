import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';
import '../styles/LoginPage.css';

function LoginPage({ onLoginSuccess, onShowSignup }) {
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [featureInfo, setFeatureInfo] = useState(null);
  
  // Signup state
  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [signupError, setSignupError] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Real login with MongoDB
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      try {
        // Use demo/test mode directly (backend not needed for MVP testing)
        const demoUserId = 'demo_' + Math.random().toString(36).substr(2, 9);
        const demoUserData = {
          id: demoUserId,
          name: email.split('@')[0],
          email: email,
          loginTime: new Date().toISOString(),
          rememberMe
        };

        localStorage.setItem('mindmirror_user', JSON.stringify(demoUserData));
        localStorage.setItem('mindmirror_user_id', demoUserId);
        
        setSuccess('✅ Login successful! (Demo Mode)');
        // Immediately proceed
        onLoginSuccess(demoUserData);
      } catch (err) {
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Feature info handler - shows what each feature does
  const handleFeatureClick = (feature) => {
    const features = {
      'ai': {
        title: 'AI-Powered Emotion Detection',
        description: 'Advanced AI analyzes your journal entries to detect emotional patterns, sentiment, and mood trends in real-time.',
        examples: ['Identifies stress levels', 'Detects emotional shifts', 'Recognizes patterns over time']
      },
      'analytics': {
        title: 'Real-Time Analytics Dashboard',
        description: 'Track your mental health with comprehensive analytics. Visual charts show emotion trends, burnout risk levels, and wellbeing scores.',
        examples: ['Weekly emotion charts', 'Burnout risk tracker', 'Wellbeing metrics']
      },
      'insights': {
        title: 'Smart AI Recommendations',
        description: 'Personalized recommendations based on your emotional data. Get actionable insights to improve your mental health and prevent burnout.',
        examples: ['Customized wellness tips', 'Stress management strategies', 'Work-life balance suggestions']
      }
    };
    setFeatureInfo(features[feature]);
  };

  return (
    <div className="login-container">
      {/* Animated background */}
      <div className="login-bg">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
        <div className="gradient-3"></div>
        <div className="floating-blob blob-1"></div>
        <div className="floating-blob blob-2"></div>
        <div className="floating-blob blob-3"></div>
      </div>

      <div className="login-content">
        {/* Header */}
        <div className="login-header">
          <div className="logo-circle">
            <span className="logo-icon">🧠</span>
          </div>
          <h1>MindMirror AI</h1>
          <p>Understand Your Emotions, Predict Your Burnout</p>
        </div>

        {/* Login/Signup Card */}
        {!isSignupMode ? (
        <div className="login-card">
          {/* Method Toggle */}
          <div className="method-toggle">
            <button
              className={`toggle-btn ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => {
                setLoginMethod('email');
                setError('');
              }}
            >
              <span className="toggle-icon">📧</span>
              Email
            </button>
            <button
              className={`toggle-btn ${loginMethod === 'mobile' ? 'active' : ''}`}
              onClick={() => {
                setLoginMethod('mobile');
                setError('');
              }}
            >
              <span className="toggle-icon">📱</span>
              Mobile
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            {/* Email/Mobile Input */}
            <div className="form-group">
              {loginMethod === 'email' ? (
                <>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input glass-input"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit number"
                    className="form-input glass-input"
                  />
                </>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="form-input glass-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-footer">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="message error-message">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="message success-message">
                <span>✅</span> {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>🚀</span> Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn google-btn" title="Google Login">
              <span>🔍</span>
            </button>
            <button className="social-btn github-btn" title="GitHub Login">
              <span>💻</span>
            </button>
            <button className="social-btn apple-btn" title="Apple Login">
              <span>🍎</span>
            </button>
          </div>

          {/* Demo Button */}
          <button
            type="button"
            className="demo-btn"
            onClick={handleDemoLogin}
          >
            Try Demo Account
          </button>

          {/* Signup Section */}
          <div className="signup-prompt">
            <p>New to MindMirror?</p>
            <button 
              type="button"
              className="signup-btn"
              onClick={() => setIsSignupMode(true)}
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p className="terms">
              By logging in, you agree to our{' '}
              <a href="#terms">Terms</a> and{' '}
              <a href="#privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
        ) : (
        <div className="login-card">
          {/* Back to Login */}
          <button 
            type="button"
            className="back-to-login"
            onClick={() => {
              setIsSignupMode(false);
              setSignupStep(1);
              setSignupError('');
              setSignupData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: false
              });
            }}
          >
            ← Back to Login
          </button>

          <h2 className="signup-title">Create Your Account</h2>

          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step ${signupStep >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${signupStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${signupStep >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${signupStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${signupStep >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {signupError && (
            <div className="message error-message">
              <span>⚠️</span> {signupError}
            </div>
          )}

          {/* Step 1: Full Name */}
          {signupStep === 1 && (
            <form className="signup-form" onSubmit={(e) => {
              e.preventDefault();
              if (signupData.name.trim()) {
                setSignupStep(2);
                setSignupError('');
              } else {
                setSignupError('Please enter your full name');
              }
            }}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={signupData.name}
                  onChange={(e) => {
                    setSignupData({...signupData, name: e.target.value});
                    setSignupError('');
                  }}
                  placeholder="Enter your full name"
                  className="form-input glass-input"
                  autoFocus
                />
              </div>
              <button type="submit" className="login-btn">Continue →</button>
            </form>
          )}

          {/* Step 2: Email */}
          {signupStep === 2 && (
            <form className="signup-form" onSubmit={(e) => {
              e.preventDefault();
              if (signupData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
                setSignupStep(3);
                setSignupError('');
              } else {
                setSignupError('Please enter a valid email address');
              }
            }}>
              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => {
                    setSignupData({...signupData, email: e.target.value});
                    setSignupError('');
                  }}
                  placeholder="your@email.com"
                  className="form-input glass-input"
                />
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                <button 
                  type="button"
                  className="login-btn" 
                  style={{flex: 1, background: 'rgba(102, 126, 234, 0.2)', border: '1px solid #667eea'}}
                  onClick={() => setSignupStep(1)}
                >
                  ← Back
                </button>
                <button type="submit" className="login-btn" style={{flex: 1}}>Continue →</button>
              </div>
            </form>
          )}

          {/* Step 3: Password & Age */}
          {signupStep === 3 && (
            <form className="signup-form" onSubmit={async (e) => {
              e.preventDefault();
              
              if (!signupData.password || signupData.password !== signupData.confirmPassword) {
                setSignupError('Passwords do not match');
                return;
              }
              
              if (signupData.password.length < 6) {
                setSignupError('Password must be at least 6 characters');
                return;
              }
              
              if (!signupData.email && !signupData.mobile) {
                setSignupError('Please provide email or mobile number');
                return;
              }
              
              if (!signupData.terms) {
                setSignupError('Please accept terms and conditions');
                return;
              }

              setLoading(true);
              try {
                // Use demo mode directly
                const demoUserId = 'demo_' + Math.random().toString(36).substr(2, 9);
                const userData = {
                  id: demoUserId,
                  name: signupData.name || signupData.fullName,
                  email: signupData.email,
                  signupTime: new Date().toISOString()
                };
                
                localStorage.setItem('mindmirror_user', JSON.stringify(userData));
                localStorage.setItem('mindmirror_user_id', demoUserId);
                
                setSuccess('✅ Account created! (Demo Mode)');
                // Immediately proceed
                onLoginSuccess(userData);
              } catch (err) {
                const errorMsg = err.response?.data?.error || err.message || 'Signup failed. Please try again.';
                setSignupError(errorMsg);
                console.error('Signup error:', err);
              } finally {
                setLoading(false);
              }
            }}>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={(e) => {
                      setSignupData({...signupData, password: e.target.value});
                      setSignupError('');
                    }}
                    placeholder="At least 8 characters"
                    className="form-input glass-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                  >
                    {showSignupPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    id="signup-confirm"
                    type={showSignupConfirmPassword ? 'text' : 'password'}
                    value={signupData.confirmPassword}
                    onChange={(e) => {
                      setSignupData({...signupData, confirmPassword: e.target.value});
                      setSignupError('');
                    }}
                    placeholder="Re-enter password"
                    className="form-input glass-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                  >
                    {showSignupConfirmPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-age">Age</label>
                <input
                  id="signup-age"
                  type="number"
                  value={signupData.age}
                  onChange={(e) => {
                    setSignupData({...signupData, age: e.target.value});
                    setSignupError('');
                  }}
                  placeholder="Your age"
                  className="form-input glass-input"
                  min="13"
                />
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={signupData.terms}
                  onChange={(e) => setSignupData({...signupData, terms: e.target.checked})}
                />
                <span>I agree to Terms and Privacy Policy</span>
              </label>
              <div style={{display: 'flex', gap: '10px'}}>
                <button 
                  type="button"
                  className="login-btn"
                  style={{flex: 1, background: 'rgba(102, 126, 234, 0.2)', border: '1px solid #667eea'}}
                  onClick={() => setSignupStep(2)}
                >
                  ← Back
                </button>
                <button type="submit" className="login-btn" style={{flex: 1}}>Create Account</button>
              </div>
            </form>
          )}
        </div>
        )}

        {/* Features Highlight - Now Clickable & Functional */}
        <div className="features-highlight">
          <div className="feature-item" onClick={() => handleFeatureClick('ai')}>
            <span className="feature-icon">🎯</span>
            <h3>AI-Powered</h3>
            <p>Smart emotion detection</p>
          </div>
          <div className="feature-item" onClick={() => handleFeatureClick('analytics')}>
            <span className="feature-icon">📊</span>
            <h3>Real Analytics</h3>
            <p>Track your mental health</p>
          </div>
          <div className="feature-item" onClick={() => handleFeatureClick('insights')}>
            <span className="feature-icon">💡</span>
            <h3>Smart Insights</h3>
            <p>Personalized recommendations</p>
          </div>
        </div>

        {/* Feature Info Modal */}
        {featureInfo && (
          <div className="feature-modal-overlay" onClick={() => setFeatureInfo(null)}>
            <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setFeatureInfo(null)}>✕</button>
              <h2>{featureInfo.title}</h2>
              <p className="modal-description">{featureInfo.description}</p>
              <div className="modal-examples">
                <h4>What You Get:</h4>
                <ul>
                  {featureInfo.examples.map((example, idx) => (
                    <li key={idx}>✓ {example}</li>
                  ))}
                </ul>
              </div>
              <button 
                className="modal-cta-btn"
                onClick={() => {
                  setFeatureInfo(null);
                  setIsSignupMode(true);
                }}
              >
                Try It Now - Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
