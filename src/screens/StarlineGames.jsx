import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import '../css/mainhome.css';
import '../css/StarlineGames.css'; // We will create this CSS file next

import AppHeader from '../components/AppHeader';

// const CARD_COLORS = [
//   "#f3dfd9", // peach
//   "#e9dcf8", // lavender
//   "#dcefe2", // mint
//   "#daeeee", // teal
//   "#dfe7f9", // blue
// ];

// const pickCardColor = (i) => CARD_COLORS[i % CARD_COLORS.length];

const CARD_THEMES = [
  { bg:"#f3ccc0ff", chip:"#f9e6e0", accent:"#f84404",
    iconFilter:"brightness(0) saturate(100%) invert(32%) sepia(95%) saturate(1200%) hue-rotate(5deg) brightness(95%) contrast(110%)" },
  { bg:"#bdcdf8ff", chip:"#eaf0fd", accent:"#1d4ed8",
    iconFilter:"brightness(0) saturate(100%) invert(23%) sepia(88%) saturate(2593%) hue-rotate(212deg) brightness(92%) contrast(100%)" },
  { bg:"#e1bdf5ff", chip:"#f6ebff", accent:"#8b5cf6",
    iconFilter:"brightness(0) saturate(100%) invert(16%) sepia(97%) saturate(4914%) hue-rotate(267deg) brightness(82%) contrast(104%)" },
  { bg:"#d3f5e4ff", chip:"#e9f8f0", accent:"#16a34a",
    iconFilter:"brightness(0) saturate(100%) invert(42%) sepia(86%) saturate(426%) hue-rotate(89deg) brightness(96%) contrast(87%)" },
  { bg:"#c7f1f1ff", chip:"#e9f7f7", accent:"#0ea5a7",
    iconFilter:"brightness(0) saturate(100%) invert(38%) sepia(43%) saturate(781%) hue-rotate(136deg) brightness(93%) contrast(86%)" },
];

const pickTheme = (i) => CARD_THEMES[i % CARD_THEMES.length];



const StarlineGames = () => {
  const navigate = useNavigate();
  const { marketId } = useParams(); // Gets the specific starline game ID (e.g., "123")
  const location = useLocation();   // Gets the name passed from the previous screen
  const { user } = useContext(AppContext);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the market name (e.g., "10:30 AM") from the previous screen's state
  const marketName = location.state?.gameName || 'Starline Game';

  useEffect(() => {
    const fetchStarlineGameTypes = async () => {
      const mobileNo = user?.mobileNo || localStorage.getItem('mobileNo');
      if (!mobileNo) {
        setError("Mobile number not found.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('accessToken');
        // CAUTION: Please replace with your actual API endpoint for starline game types
        const response = await axios.get(
          'https://admin.gama567.club/api/v1/starline-game-bid-type', 
          { mobileNo },
          {
            headers: {
              "deviceId": "qwert",
            "deviceName": "sm2233",
            "accessStatus": "1",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
              // Add other necessary headers
            },
          }
        );

        if (response.data?.status && Array.isArray(response.data.info)) {
           const themed = response.data.info.map((g, i) => {
    const t = pickTheme(i);
    return {
      ...g,
      theme: t,
    };
  });
  setGames(themed);
        } else {
          throw new Error(response.data.msg || "Failed to fetch game types.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching starline game types:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStarlineGameTypes();
  }, [user]); // Re-fetch if user changes

  const handleGameClick = (game) => {
    // Navigate to our main BidGames screen, passing both the marketId and the gameType
    // The 'game.type' (e.g., "singleDigits") must match a key in your gameConfigs.js file
    navigate(`/bid/starline/${marketId}/${game.type}`, {
      state: { marketName: marketName } // Pass the market name for the header
    });
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="st-games-container">
        <div className="st-games-header">
          <button className="st-back-btn" onClick={() => navigate(-1)}>‹</button>
          <h2>DASHBOARD</h2>
          {/* <div className="st-wallet">
            <span className="st-wallet-icon"></span>
            <span>{user?.walletBalance || '0'}</span>
          </div> */}
        </div>
         {/* <AppHeader
                              title={"DASHBOARD"}
                               walletBalance={user?.walletBalance}
                              onBack={() => navigate(-1)}
                              onWalletClick={() => navigate("/passbook")}
                            /> */}
                

        <div className="st-games-grid screen-content">
          {loading && <p className="st-message">Loading Games...</p>}
          {error && <p className="st-message error">{error}</p>}
          {!loading && !error && games.map((game) => (
            <div key={game.id} className="st-game-card"  style={{
      "--bg": game.theme.bg,
    "--chip": game.theme.chip,
    "--accent": game.theme.accent,
    "--icon-filter": game.theme.iconFilter,
    }} onClick={() => handleGameClick(game)}>
              <div className="st-game-icon-wrapper">
                <img src={game.image} alt={game.name} />
                 {/* <span
        className="st-game-icon"
        style={{ "--icon-url": `url(${game.image})` }}
        aria-hidden="true"
      /> */}
              </div>
              <p>{game.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarlineGames;