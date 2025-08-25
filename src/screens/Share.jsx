// src/pages/ShareApp.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const APP_SHARE_DATA = {
  title: 'Sara777',
  text : 'Download the Sara777 app and play now!',
  url  : 'https://yourwebsite.com/download',   // ← put your actual link here
};

export default function ShareApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const fallback = () => {
      // Copy link to clipboard as a graceful fallback
      navigator.clipboard
        .writeText(APP_SHARE_DATA.url)
        .then(() => alert('Link copied!  Share it with your friends.'))
        .catch(() => alert('Unable to share on this browser.'));
      navigate(-1);        // go back to the previous page
    };

    // Try native share first
    if (navigator.share) {
      navigator
        .share(APP_SHARE_DATA)
        .catch(() => {})   // user cancelled — just ignore
        .finally(() => navigate(-1));
    } else {
      fallback();
    }
  }, [navigate]);

  // Minimal placeholder UI while effect runs
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
      }}
    >
      Preparing share sheet…
    </div>
  );
}
