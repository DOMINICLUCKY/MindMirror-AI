import React, { useEffect, useState } from 'react';

const OAuthCallback = ({ provider, onLoginSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get authorization code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          throw new Error(errorDescription || `OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received from OAuth provider');
        }

        // Send code to backend to exchange for token
        const response = await fetch('/api/auth/oauth/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider,
            code,
            state
          })
        });

        if (!response.ok) {
          throw new Error(`OAuth callback failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          // Store user data and redirect
          localStorage.setItem('mindmirror_user', JSON.stringify(data.user));
          localStorage.setItem('mindmirror_user_id', data.user.id);
          localStorage.setItem('mindmirror_auth_token', data.token);

          onLoginSuccess(data.user);
        } else {
          throw new Error(data.error || 'OAuth login failed');
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    handleCallback();
  }, [provider, onLoginSuccess]);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0e27',
      color: 'white',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {loading ? (
        <>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            animation: 'spin 2s linear infinite'
          }}>
            🔄
          </div>
          <h2>Completing {provider} login...</h2>
          <p>Please wait while we verify your identity</p>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </>
      ) : (
        <>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            color: '#ff6b6b'
          }}>
            ⚠️
          </div>
          <h2>Login Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#667eea',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
};

export default OAuthCallback;
