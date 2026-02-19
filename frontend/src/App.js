import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnalysisPage from './pages/AnalysisPage';

// Lazy load pages
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mindmirror_user');
    const token = localStorage.getItem('mindmirror_auth_token');
    const storedDarkMode = localStorage.getItem('darkMode');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.style.backgroundColor = '#0a0e27';
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('mindmirror_user');
    localStorage.removeItem('mindmirror_auth_token');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
    setSidebarOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('home');
    setShowSignup(false);
  };

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    return showSignup ? (
      <SignupPage
        onSignupSuccess={handleLoginSuccess}
        onBackToLogin={() => setShowSignup(false)}
      />
    ) : (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onShowSignup={() => setShowSignup(true)}
      />
    );
  }

  // Main app with authentication
  return (
    <div className="App authenticated" data-theme={darkMode ? 'dark' : 'light'}>
      {/* Modern Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="navbar-logo">🧠 MindMirror</h1>
          </div>

          <ul className="nav-menu">
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('home');
                  setSidebarOpen(false);
                }}
              >
                📝 Journal
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('dashboard');
                  setSidebarOpen(false);
                }}
              >
                📊 Analytics
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage('profile');
                  setSidebarOpen(false);
                }}
              >
                👤 Profile
              </button>
            </li>
          </ul>

          <div className="navbar-right">
            <button 
              className={`nav-link settings-btn ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage('settings');
                setSidebarOpen(false);
              }}
              title="Settings"
            >
              ⚙️
            </button>
            <button 
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h3>Menu</h3>
              <button onClick={() => setSidebarOpen(false)}>✕</button>
            </div>
            <div className="sidebar-content">
              <div className="user-card">
                <div className="user-avatar">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="user-name">{user?.email || user?.mobile || 'User'}</p>
                  <p className="user-status">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="page-container">
        {currentPage === 'home' && (
          <HomePage 
            user={user}
            onAnalyze={(result) => {
              setAnalysisResult(result);
              setCurrentPage('analysis');
            }}
          />
        )}
        {currentPage === 'analysis' && analysisResult && (
          <AnalysisPage 
            result={analysisResult}
            onBack={() => setCurrentPage('home')}
          />
        )}
        {currentPage === 'dashboard' && (
          <DashboardPage onHome={() => setCurrentPage('home')} />
        )}
        {currentPage === 'profile' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <ProfilePage user={user} onLogout={handleLogout} />
          </Suspense>
        )}
        {currentPage === 'settings' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <SettingsPage 
              onLogout={handleLogout}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onNavigate={setCurrentPage}
            />
          </Suspense>
        )}
        {currentPage === 'faq' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <FAQPage onBack={() => setCurrentPage('home')} />
          </Suspense>
        )}
        {currentPage === 'contact' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <ContactPage onBack={() => setCurrentPage('home')} />
          </Suspense>
        )}
        {currentPage === 'docs' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <DocumentationPage onBack={() => setCurrentPage('home')} />
          </Suspense>
        )}
        {currentPage === 'status' && (
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <StatusPage onBack={() => setCurrentPage('home')} />
          </Suspense>
        )}
      </div>

      {/* Modern Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MindMirror AI</h4>
            <p>Understand your emotions, predict burnout early</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://twitter.com/mindmirrorai" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com/company/mindmirrorai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/mindmirrorai" target="_blank" rel="noopener noreferrer">🔗 GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MindMirror AI | Early Burnout Prevention & Emotional Health Analytics</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
