import React, { useState } from 'react';
import '../styles/ProfilePage.css';

function ProfilePage({ user, onLogout }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: user?.email || 'user@example.com',
    bio: 'Passionate about mental health and wellness',
    joinDate: new Date(user?.loginTime).toLocaleDateString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // TODO: Save to backend
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-info">
            <div className="profile-avatar-lg">
              {formData.fullName[0]}
            </div>
            <div className="profile-text">
              <h2>{formData.fullName}</h2>
              <p>{formData.email}</p>
            </div>
            <button 
              className="edit-profile-btn"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '✕' : '✏️'} {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="profile-body">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">12</div>
              <p>Journal Entries</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">45%</div>
              <p>Avg Burnout</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">28</div>
              <p>Days Active</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">⭐</div>
              <p>Premium Member</p>
            </div>
          </div>

          {/* Edit Form or Info */}
          {editMode ? (
            <div className="edit-form-card">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          ) : (
            <div className="info-card">
              <h3>About</h3>
              <p>{formData.bio}</p>
              <div className="info-item">
                <span className="label">Member Since:</span>
                <span className="value">{formData.joinDate}</span>
              </div>
              <div className="info-item">
                <span className="label">Account Status:</span>
                <span className="value">✅ Active</span>
              </div>
            </div>
          )}

          {/* Achievements */}
          <div className="achievements-card">
            <h3>🏆 Achievements</h3>
            <div className="achievements-grid">
              <div className="achievement">
                <span className="achievement-icon">🎯</span>
                <p>First Entry</p>
              </div>
              <div className="achievement">
                <span className="achievement-icon">📊</span>
                <p>Data Master</p>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🔥</span>
                <p>7-Day Streak</p>
              </div>
              <div className="achievement">
                <span className="achievement-icon">💪</span>
                <p>Health Warrior</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="danger-zone">
            <h3>⚠️ Danger Zone</h3>
            <button className="logout-btn-danger" onClick={onLogout}>
              Logout
            </button>
            <button className="delete-btn">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
