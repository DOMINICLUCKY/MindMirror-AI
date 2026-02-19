import React, { useState } from 'react';
import '../styles/SettingsPage.css';

function SettingsPage({ onLogout, darkMode = true, setDarkMode = () => {}, onNavigate = () => {} }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    dataCollection: true,
    twoFactorAuth: false,
    dailyReminder: true,
    reminderTime: '09:00'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('mindmirror_settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>⚙️ Settings</h1>

        {/* Notification Settings */}
        <div className="settings-card">
          <h2>🔔 Notifications</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Get browser push alerts</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Daily Reminder</h4>
                <p>Remind me to journal daily</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.dailyReminder}
                  onChange={() => handleToggle('dailyReminder')}
                />
                <span className="slider"></span>
              </label>
            </div>

            {settings.dailyReminder && (
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Reminder Time</h4>
                  <p>What time should we remind you?</p>
                </div>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => setSettings({...settings, reminderTime: e.target.value})}
                  className="time-input"
                />
              </div>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-card">
          <h2>🔒 Privacy & Security</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Data Collection</h4>
                <p>Allow analytics to improve service</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.dataCollection}
                  onChange={() => handleToggle('dataCollection')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="settings-card">
          <h2>🎨 Display</h2>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Dark Mode</h4>
                <p>Use dark theme for better viewing</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Support */}
        <div className="settings-card">
          <h2>❓ Help & Support</h2>
          <div className="settings-group">
            <button 
              type="button"
              className="help-btn"
              onClick={() => onNavigate('faq')}
            >
              📚 FAQ
            </button>
            <button 
              type="button"
              className="help-btn"
              onClick={() => onNavigate('contact')}
            >
              💬 Contact Support
            </button>
            <button 
              type="button"
              className="help-btn"
              onClick={() => onNavigate('docs')}
            >
              📖 Documentation
            </button>
            <button 
              type="button"
              className="help-btn"
              onClick={() => onNavigate('status')}
            >
              📡 System Status
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button className="save-settings-btn" onClick={handleSave}>
          💾 Save All Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
