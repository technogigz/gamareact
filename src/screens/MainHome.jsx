import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/mainhome.css";
import Header from "../components/Header";
import BannerTicker from "../components/BannerTicker";
import GameTabs from "../components/GameTabs";
import ContactBar from "../components/ContactBar";
import GameCard from "../components/GameCard";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";
import ClosedModal from "../components/ClosedModal";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import GameTimeModal from "../components/GameTimeModal";

export default function MainHome() {
  const [games, setGames] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [closedGame, setClosedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGameTime, setShowGameTime] = useState(false);
const [selectedGame, setSelectedGame] = useState(null);

  const navigate = useNavigate();
   const { user } = useContext(AppContext);

   const [settings, setSettings] = useState({
    bannerText: 'Loading...',
    contact1: '',
    contact2: ''
  });

  // ... your fetchGames and useEffect logic remains the same ...
  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const registerId = localStorage.getItem("registerId");

      if (!token || !registerId) {
        console.warn("Missing token or registerId in localStorage");
        return;
      }

      const response = await axios.post(
        "https://admin.gama567.club/api/v1/game-list",
        { registerId },
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

      if (response.data.status) {
        setGames(response.data.info);
        console.log(games);
      } else {
        console.warn("Game list fetch failed:", response.data.msg);
      }
    } catch (err) {
      console.error("Game list fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
    

      
   useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://admin.gama567.club/api/v1/contact-detail", // IMPORTANT: Replace with your actual settings endpoint
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              deviceId: "qwert",
              deviceName: "sm2233",
              accessStatus: "1",
            }
          }
        );

        if (response.data.status && response.data.info) {
          const { homepageContent, mobileNo, whatsappNo } = response.data.info.contactInfo;
          setSettings({
            bannerText: homepageContent,
            contact1: mobileNo,
            contact2: whatsappNo
          });
        }
      } catch (error) {
        console.error("Failed to fetch app settings:", error);
        setSettings(prev => ({ ...prev, bannerText: 'Failed to load information.' }));
      }
    };

    fetchSettings();
  }, []);

   const isAccountActive = user?.accountStatus === true;


  // ✅ CHANGED: This function is updated for dynamic routing
  // In MainHome.jsx

const handleGameClick = (game) => {
  if (!user?.accountStatus) {
      // Show a message and stop the function
       // toast.error('Your account is currently inactive.Please contact support.');
      return; 
    }
  if (!game.playStatus) {
    setClosedGame(game);
  } else {
    // Navigate using the numeric gameId and pass the name in the state
    navigate(`/market/${game.gameId}`, { 
      state: { gameName: game.gameName ,
         openBidTime: game.openTime} 
    });
  }
};

  return (
    <div className="mainhome-screen-wrapper" style={{ position: "relative" }}>
      <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)}  isAccountActive={isAccountActive} />

      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {isAccountActive && <BannerTicker text={settings.bannerText} />}
     <GameTabs isAccountActive={isAccountActive} />
        {isAccountActive && <ContactBar number1={settings.contact1} number2={settings.contact2} />}

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", paddingBottom: 90 }}>
        {!loading &&
          games.map((g) => (
            <div key={g.gameId} onClick={() => handleGameClick(g)}>
              <GameCard
                title={g.gameName}
                number={g.result}
                openTime={g.openTime}
                closeTime={g.closeTime}
                closed={!g.playStatus}
                isAccountActive={user?.accountStatus === true}
                statusText={g.statusText}

                  onTimeClick={() => {
      setSelectedGame({
        gameName: g.gameName,
        openTime: g.openTime,
        closeTime: g.closeTime,
        playStatus:g.playStatus
      });
      setShowGameTime(true);
    }}

              />
            </div>
          ))}
      </div>

      <BottomNav active="Home" whatsappNumber={settings.contact2} />

      {closedGame && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          <ClosedModal game={closedGame} onClose={() => setClosedGame(null)} />
        </div>
      )}


      {showGameTime && (
  <GameTimeModal game={selectedGame} onClose={() => setShowGameTime(false)} />
)}
    </div>
  );
}