import React, { useState } from 'react';
import '../styles/ForgotPasswordPage.css';

function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: password
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Demo mode - simulate sending code
      const demoCode = '123456';
      localStorage.setItem('forgotPasswordCode', demoCode);
      localStorage.setItem('forgotPasswordEmail', email);

      setMessage(`✅ Recovery code sent to ${email} (Demo: Use code 123456)`);
      setTimeout(() => {
        setStep(2);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const savedCode = localStorage.getItem('forgotPasswordCode');
      
      if (code !== savedCode) {
        throw new Error('Invalid recovery code');
      }

      setMessage('✅ Code verified! Reset your password.');
      setTimeout(() => {
        setStep(3);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Demo mode - simulate password reset
      setMessage('✅ Password reset successfully! Redirecting to login...');
      
      localStorage.removeItem('forgotPasswordCode');
      localStorage.removeItem('forgotPasswordEmail');

      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-bg">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
      </div>

      <div className="forgot-password-card">
        <button className="back-btn" onClick={onBack}>← Back</button>

        <div className="forgot-header">
          <h2>Reset Password</h2>
          <p>Recover access to your account</p>
        </div>

        <div className="step-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="form-input"
              />
            </div>

            {error && <div className="message error">{error}</div>}
            {message && <div className="message success">{message}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Recovery Code'}
            </button>
          </form>
        )}

        {/* Step 2: Verify Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div className="form-group">
              <label>Recovery Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="form-input"
                maxLength="6"
              />
            </div>

            {error && <div className="message error">{error}</div>}
            {message && <div className="message success">{message}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="form-input"
              />
            </div>

            {error && <div className="message error">{error}</div>}
            {message && <div className="message success">{message}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
