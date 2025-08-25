// src/pages/SettingsScreen.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import '../css/Settings.css'; // Imp
import BottomNav from '../components/BottomNav';
import "../css/mainhome.css"
const SettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    main: true,
    game: true,
    starline: true,
    jackpot: false,
  });

  const [language, setLanguage] = useState('en');

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
   const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="mainhome-screen-wrapper">
      <div className="settings-screen">
      <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)} />
                 
                       {/* ⬅️ Move Sidebar here */}
                       {isSidebarOpen && (
                         <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
                       )}

      <main className="settings-content">
        <section className="settings-section">
          <h2 className="section-title">Notification Settings</h2>

          <div className="notification-list">
            <div className="notification-item">
              <span>Main Notification</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.main}
                  onChange={() => toggleNotification('main')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <span>Game Notification</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.game}
                  onChange={() => toggleNotification('game')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <span>King Starline Notification</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.starline}
                  onChange={() => toggleNotification('starline')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <span>King Jackpot Notification</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications.jackpot}
                  onChange={() => toggleNotification('jackpot')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="section-title">Language Settings</h2>

          <div className="language-list">
            <label className="language-option">
              <input
                type="radio"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
              />
              English
            </label>

            <label className="language-option">
              <input
                type="radio"
                name="language"
                value="hi"
                checked={language === 'hi'}
                onChange={() => setLanguage('hi')}
              />
              हिंदी
            </label>

            <label className="language-option">
              <input
                type="radio"
                name="language"
                value="te"
                checked={language === 'te'}
                onChange={() => setLanguage('te')}
              />
              తెలుగు
            </label>

            <label className="language-option">
              <input
                type="radio"
                name="language"
                value="kn"
                checked={language === 'kn'}
                onChange={() => setLanguage('kn')}
              />
              ಕನ್ನಡ
            </label>
          </div>
        </section>
      </main>

      <BottomNav />
      </div>
    </div>
  );
};

export default SettingsScreen;
