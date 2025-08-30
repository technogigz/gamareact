import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import '../css/mainhome.css';
import '../css/StarlineGames.css'; // We will create this CSS file next

import AppHeader from '../components/AppHeader';

const CARD_COLORS = [
  "#f3dfd9", // peach
  "#e9dcf8", // lavender
  "#dcefe2", // mint
  "#daeeee", // teal
  "#dfe7f9", // blue
];

const pickCardColor = (i) => CARD_COLORS[i % CARD_COLORS.length];



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
          const withGradients = response.data.info.map((g,i) => ({
            ...g,
            bg: pickCardColor(i),
          }));
          setGames(withGradients);
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
        {/* <div className="st-games-header">
          <button className="st-back-btn" onClick={() => navigate(-1)}>‹</button>
          <h2>{marketName}</h2>
          <div className="st-wallet">
            <span className="st-wallet-icon"></span>
            <span>{user?.walletBalance || '0'}</span>
          </div>
        </div> */}
         <AppHeader
                              title={marketName}
                               walletBalance={user?.walletBalance}
                              onBack={() => navigate(-1)}
                              onWalletClick={() => navigate("/passbook")}
                            />
                

        <div className="st-games-grid screen-content">
          {loading && <p className="st-message">Loading Games...</p>}
          {error && <p className="st-message error">{error}</p>}
          {!loading && !error && games.map((game) => (
            <div key={game.id} className="st-game-card"  style={{ background: game.bg }} onClick={() => handleGameClick(game)}>
              <div className="st-game-icon-wrapper">
                <img src={game.image} alt={game.name} />
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