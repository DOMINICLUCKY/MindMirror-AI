// OAuth Configuration for Social Login Providers

const OAUTH_CONFIG = {
  google: {
    name: 'Google',
    icon: '🔍',
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/google/callback`,
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid profile email',
    responseType: 'code',
    getAuthUrl: function() {
      const params = new URLSearchParams({
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        response_type: this.responseType,
        scope: this.scope
      });
      return `${this.authEndpoint}?${params.toString()}`;
    }
  },
  
  github: {
    name: 'GitHub',
    icon: '💻',
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || 'YOUR_GITHUB_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/github/callback`,
    authEndpoint: 'https://github.com/login/oauth/authorize',
    scope: 'read:user user:email',
    responseType: 'code',
    getAuthUrl: function() {
      const params = new URLSearchParams({
        client_id: this.clientId,
        redirect_uri: this.redirectUri,
        scope: this.scope,
        response_type: this.responseType
      });
      return `${this.authEndpoint}?${params.toString()}`;
    }
  },
  
  apple: {
    name: 'Apple',
    icon: '🍎',
    teamId: process.env.REACT_APP_APPLE_TEAM_ID || 'YOUR_APPLE_TEAM_ID',
    clientId: process.env.REACT_APP_APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID',
    keyId: process.env.REACT_APP_APPLE_KEY_ID || 'YOUR_APPLE_KEY_ID',
    redirectUri: `${window.location.origin}/auth/apple/callback`,
    authEndpoint: 'https://appleid.apple.com/auth/authorize',
    responseType: 'code id_token',
    responseMode: 'form_post',
    getAuthUrl: function() {
      const params = new URLSearchParams({
        client_id: this.clientId,
        team_id: this.teamId,
        key_id: this.keyId,
        redirect_uri: this.redirectUri,
        response_type: this.responseType,
        response_mode: this.responseMode,
        scope: 'name email'
      });
      return `${this.authEndpoint}?${params.toString()}`;
    }
  }
};

export default OAUTH_CONFIG;

// Helper function to get demo user data
export const getDemoUserData = (provider) => {
  const providers = {
    google: {
      name: 'Google User',
      email: `user.google.${Date.now()}@example.com`,
      avatar: '🔍',
      provider: 'google'
    },
    github: {
      name: 'GitHub User',
      email: `user.github.${Date.now()}@example.com`,
      avatar: '💻',
      provider: 'github'
    },
    apple: {
      name: 'Apple User',
      email: `user.apple.${Date.now()}@example.com`,
      avatar: '🍎',
      provider: 'apple'
    }
  };
  
  return providers[provider] || null;
};
