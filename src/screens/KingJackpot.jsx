import { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/KingJackpot.css";
import "../css/mainhome.css";
import clock from "../assets/icons/stopwatch.png";
import cloock from "../assets/icons/chronometer.png";
import { AppContext } from "../context/AppContext"; // 2. Import your context

import StarlineClosedModal from '../components/starlineclosedmodal';

export default function KingJackpotScreen() {
  const navigate = useNavigate();
  // const [showClosedModal, setShowClosedModal] = useState(false);
  // const [closedGameTime, setClosedGameTime] = useState("");
  const [gameList, setGameList] = useState([]);
   const [closedGame, setClosedGame] = useState(null); 
   const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchJackpotGames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const registerId = localStorage.getItem("registerId");

        if (!token || !registerId) {
          console.error("Missing token or registerId");
          return;
        }

        const response = await axios.post(
          "https://sarra777.net/api/v1/jackpot-game-list", // 🔁 Replace with real URL
          {
            registerId: registerId,
          },
          {
            headers: {
              deviceId: "qwert",
              deviceName: "sm2233",
              accessStatus: "1",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.status && Array.isArray(response.data.info)) {
          const formatted = response.data.info.map((g) => ({
            gameId:g.gameId,
            time: g.gameName,
            result: g.result,
            closed: !g.playStatus,
            statusText: g.playStatus ? "Running Now" : "Closed for Today",
            statusColor: g.playStatus ? "green" : "red",
            closeTime: g.closeTime,
            openTime:g.openTime
          }));
          setGameList(formatted);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching jackpot games:", error);
      }
    };

    fetchJackpotGames();
  }, []);

  const handleGameClick = (game) => {
    if (!user?.accountStatus) {
      alert("Your account is inactive. Please contact support.");
      return;
    }

    if (!game.closed) { // Check the 'closed' property from your formatted data
      // Navigate to the jackpot game selection screen
      navigate(`/jackpot/${game.gameId}`, { 
        state: { gameName: game.gameName } 
      });
    } else {
      // If the game is closed, show the modal
      setClosedGame(game);
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="kj-screen">
        {/* Header */}
        <div className="kj-header">
          <div className="kj-header-top">
            <div className="kj-header-left">
              <button className="kj-back" onClick={() => navigate(-1)}>‹</button>
              <h2>King Jackpot</h2>
            </div>
          </div>
          <div className="kj-header-bottom">
            <div className="kj-history">
              <button className="icon-calendar" onClick={()=>navigate('/bids/jackpot-result-history')}/>
              <span className="label">History</span>
            </div>
            <div className="kj-toggle-wrapper">
              <span className="label">Notifications</span>
              <label className="kj-toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="kj-tabs">
          <span className="tab active">Jodi 1-{gameList.length}</span>
        </div>

        {/* Cards */}
        <div className="kj-body">
          {gameList.map((g) => (
            <div
              className="kj-card"
              key={g.time}
              onClick={() => handleGameClick(g)}
            >
              <div className="kj-time-row">
                <span>{g.time}</span>
                <span className="kj-icon">
                  <img
                    src={g.closed ? clock : cloock}
                    alt={g.closed ? "Closed" : "Open"}
                    className="kj-icon-img"
                  />
                </span>
              </div>
              <div className="kj-number">{g.result}</div>
              <div className={`kj-status ${g.statusColor}`}>{g.statusText}</div>
              <button className={`kj-button ${g.statusColor}`}>
                ▶ Play Game
              </button>
            </div>
          ))}
        </div>
      </div>
      {closedGame && (
        <StarlineClosedModal 
          game={closedGame} 
          onClose={() => setClosedGame(null)} 
        />
      )}
    </div>
  );
}
