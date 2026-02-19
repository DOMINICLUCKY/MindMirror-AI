import React, { useState } from 'react';
import '../styles/SignupPage.css';

function SignupPage({ onSignupSuccess, onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    age: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (formData.fullName.trim().length < 3) {
      setError('Name must be at least 3 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.email && !formData.mobile) {
      setError('Please enter email or mobile number');
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setError('Mobile number must be 10 digits');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.age || parseInt(formData.age) < 13) {
      setError('You must be at least 13 years old');
      return false;
    }
    if (!formData.terms) {
      setError('Please accept terms and privacy policy');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateStep3()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userData = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email || formData.mobile,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('mindmirror_user', JSON.stringify(userData));
      localStorage.setItem('mindmirror_auth_token', `token_${Date.now()}`);

      onSignupSuccess(userData);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Animated Background */}
      <div className="signup-bg">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
        <div className="gradient-3"></div>
      </div>

      <div className="signup-content">
        {/* Header */}
        <div className="signup-header">
          <div className="logo-circle">
            <span className="logo-icon">🧠</span>
          </div>
          <h1>Join MindMirror</h1>
          <p>Start tracking your mental health today</p>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="signup-card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="form-step">
                <h2>Tell us about yourself</h2>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="25"
                    min="13"
                    max="120"
                    className="form-input"
                  />
                </div>

                {error && (
                  <div className="message error-message">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="next-btn"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div className="form-step">
                <h2>How can we reach you?</h2>
                
                <div className="contact-tabs">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="form-input"
                    />
                  </div>

                  <div className="divider">or</div>

                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      id="mobile"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className="form-input"
                    />
                  </div>
                </div>

                {error && (
                  <div className="message error-message">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <div className="button-group">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="back-btn"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="next-btn"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {step === 3 && (
              <div className="form-step">
                <h2>Secure your account</h2>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="At least 8 characters"
                      className="form-input"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="password-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                    />
                    <span>I agree to Terms of Service & Privacy Policy</span>
                  </label>
                </div>

                {error && (
                  <div className="message error-message">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <div className="button-group">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="back-btn"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <span>🚀</span> Create Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="signup-footer">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBackToLogin}
                className="login-link"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
