const express = require('express');
const router = express.Router();
const axios = require('axios');

// OAuth Callback Handler
router.post('/callback', async (req, res) => {
  const { provider, code, state } = req.body;

  try {
    let userData;

    if (provider === 'google') {
      userData = await handleGoogleCallback(code);
    } else if (provider === 'github') {
      userData = await handleGitHubCallback(code);
    } else if (provider === 'apple') {
      userData = await handleAppleCallback(code);
    } else {
      return res.status(400).json({ error: 'Invalid OAuth provider' });
    }

    // Find or create user in database
    const user = await findOrCreateOAuthUser(userData, provider);

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: provider,
        avatar: userData.avatar
      },
      token
    });
  } catch (error) {
    console.error(`${provider} OAuth error:`, error);
    res.status(500).json({
      error: `${provider} authentication failed`,
      details: error.message
    });
  }
});

// Google OAuth Handler
async function handleGoogleCallback(code) {
  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.FRONTEND_URL}/auth/google/callback`
  });

  const userRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenRes.data.access_token}`
    }
  });

  return {
    email: userRes.data.email,
    name: userRes.data.name,
    avatar: userRes.data.picture,
    provider: 'google',
    oauthId: userRes.data.id
  };
}

// GitHub OAuth Handler
async function handleGitHubCallback(code) {
  const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }, {
    headers: { Accept: 'application/json' }
  });

  const userRes = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenRes.data.access_token}`
    }
  });

  return {
    email: userRes.data.email || `${userRes.data.login}@github.com`,
    name: userRes.data.name || userRes.data.login,
    avatar: userRes.data.avatar_url,
    provider: 'github',
    oauthId: userRes.data.id
  };
}

// Apple OAuth Handler
async function handleAppleCallback(code) {
  // Apple OAuth implementation
  // Requires JWT generation with your private key
  // This is a placeholder for the actual implementation
  return {
    email: 'user@appleid.apple.com',
    name: 'Apple User',
    avatar: '🍎',
    provider: 'apple',
    oauthId: 'apple_oauth_id'
  };
}

// Find or create OAuth user in database
async function findOrCreateOAuthUser(userData, provider) {
  try {
    // Check if user exists
    let user = await User.findOne({
      oauthAccounts: {
        $elemMatch: { provider, oauthId: userData.oauthId }
      }
    });

    if (user) {
      return user;
    }

    // Check if email exists
    user = await User.findOne({ email: userData.email });

    if (user) {
      // Link OAuth account to existing user
      user.oauthAccounts = user.oauthAccounts || [];
      user.oauthAccounts.push({
        provider,
        oauthId: userData.oauthId
      });
      await user.save();
      return user;
    }

    // Create new user
    user = new User({
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      oauthAccounts: [{
        provider,
        oauthId: userData.oauthId
      }]
    });

    await user.save();
    return user;
  } catch (error) {
    console.error('Error finding/creating OAuth user:', error);
    throw error;
  }
}

// Generate JWT token
function generateToken(userId) {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
}

module.exports = router;
