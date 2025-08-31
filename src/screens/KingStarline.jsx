



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../css/KingStarline.css';
// import '../css/mainhome.css';
// import '../css/KingJackpot.css';
// import { useNavigate } from 'react-router-dom';

// const KingStarlineDashboard = () => {
//   const navigate = useNavigate();
//   const [games, setGames] = useState([]);

//   const gameTypes = [
//     { label: 'Single Digit', range: '10-100' },
//     { label: 'Double Pana', range: '10-3200' },
//     { label: 'Single Pana', range: '10-1600' },
//     { label: 'Triple Pana', range: '10-10000' },
//   ];

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//          const registerId = localStorage.getItem('registerId');

//         if (!token || !registerId) {
//           console.error('Missing token or registerId in localStorage');
//           return;
//         }

//         const response = await axios.post(
//           'https://sara777.win/api/v1/starline-game-list', // 🔁 Replace with actual API
//           {
//             registerId: registerId
//           },
//           {
//             headers: {
//               deviceId: 'qwert',
//               deviceName: 'sm2233',
//               accessStatus: '1',
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`, // 🔁 Replace with real token
//             },
//           }
//         );

//         if (response.data?.status && Array.isArray(response.data.info)) {
//           setGames(response.data.info);
//         } else {
//           console.error('Invalid response:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching games:', error);
//       }
//     };

//     fetchGames();
//   }, []);

//   return (
//     <div className="mainhome-screen-wrapper">
//       <div className="kj-screen">
//         <div className="kj-header">
//           <div className="kj-header-top">
//             <div className="kj-header-left">
//               <button className="kj-back" onClick={() => navigate(-1)}>‹</button>
//               <h2>King Starline</h2>
//             </div>
//           </div>
//           <div className="kj-header-bottom">
//             <div className="kj-history">
//               <span className="icon-calendar" />
//               <span className="label">History</span>
//             </div>
//             <div className="kj-toggle-wrapper">
//               <span className="label">Notifications</span>
//               <label className="kj-toggle">
//                 <input type="checkbox" defaultChecked />
//                 <span className="slider" />
//               </label>
//             </div>
//           </div>
        

//         {/* Game Type Options */}
//         <div className="ks-gametypes">
//           {gameTypes.map((item, idx) => (
//             <div key={idx} className="ks-gametype">
//               <span>{item.label}</span>
//               <span className="ks-range">{item.range}</span>
//             </div>
//           ))}
//         </div>
//            </div>
//         {/* Game Cards */}
//         <div className="ks-gamecards">
//           {games.map((game, i) => (
//             <div key={i} className="ks-gamecard">
//               <div className="ks-left">
//                 <div className="ks-time">
//                   <span className={`ks-status-icon ${game.playStatus ? 'running' : 'closed'}`}></span>
//                   <strong>{game.gameName}</strong>
//                 </div>
//                 <div className={`ks-status-text ${game.playStatus ? 'running' : 'closed'}`}>
//                   {game.playStatus ? 'Running Now' : 'Closed for Today'}
//                 </div>
//                 <div className="ks-bid-close">
//                   Bid closed at {game.closeTime}
//                 </div>
//               </div>
//               <div className="ks-right">
//                 <div className="ks-result">{game.result}</div>
//                 <button className="ks-play-btn" disabled={!game.playStatus}>▶</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KingStarlineDashboard;








// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import '../css/KingStarline.css';
// import '../css/mainhome.css';
// import '../css/KingJackpot.css';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext'; // Import your context
// import StarlineClosedModal from '../components/starlineclosedmodal'; // Import the modal component

// const KingStarlineDashboard = () => {
//   const navigate = useNavigate();
//   const [games, setGames] = useState([]);
//   const { user } = useContext(AppContext); // Get user for accountStatus check
//   // State to manage which closed game to show in the modal
//   const [closedGame, setClosedGame] = useState(null);

//   const gameTypes = [
//     { label: 'Single Digit', range: '10-100' },
//     { label: 'Double Pana', range: '10-3200' },
//     { label: 'Single Pana', range: '10-1600' },
//     { label: 'Triple Pana', range: '10-10000' },
//   ];

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const registerId = localStorage.getItem('registerId');

//         if (!token || !registerId) {
//           console.error('Missing token or registerId in localStorage');
//           return;
//         }

//         const response = await axios.post(
//           'https://admin.gama567.club/api/v1/starline-game-list',
//           { registerId },
//           {
//             headers: {
//               deviceId: 'qwert',
//               deviceName: 'sm2233',
//               accessStatus: '1',
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data?.status && Array.isArray(response.data.info)) {
//           setGames(response.data.info);
//         } else {
//           console.error('Invalid response:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching games:', error);
//       }
//     };

//     fetchGames();
//   }, []);

//   // --- ADDED: Function to handle clicks on game cards ---
//   const handleGameClick = (game) => {
//     // First, check if the user's account is active
//     if (!user?.accountStatus) {
//       alert("Your account is inactive. Please contact support.");
//       return;
//     }

//     // If the game is open, navigate to the game selection screen
//     if (game.playStatus) {
//       navigate(`/starline/${game.gameId}`, { 
//         state: { gameName: game.gameName } 
//       });
//     } else {
//       // If the game is closed, set the state to show the modal
//       setClosedGame(game);
//     }
//   };

//   return (
//     <div className="mainhome-screen-wrapper">
//       <div className="kj-screen">
//         <div className="kj-header">
//           <div className="kj-header-top">
//             <div className="kj-header-left">
//               <button className="kj-back" onClick={() => navigate(-1)}>‹</button>
//               <h2>King Starline</h2>
//             </div>
//           </div>
//           <div className="kj-header-bottom">
//             <div className="kj-history">
//               <button className="icon-calendar" onClick={()=>navigate('/bids/starline-result-history')}/>
//               <span className="label">History</span>
//             </div>
//             <div className="kj-toggle-wrapper">
//               <span className="label">Notifications</span>
//               <label className="kj-toggle">
//                 <input type="checkbox" defaultChecked />
//                 <span className="slider" />
//               </label>
//             </div>
//           </div>
        
//           <div className="ks-gametypes">
//             {gameTypes.map((item, idx) => (
//               <div key={idx} className="ks-gametype">
//                 <span>{item.label}</span>
//                 <span className="ks-range">{item.range}</span>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="ks-gamecards">
//           {games.map((game, i) => (
//             // ADDED: onClick handler to the main card div
//             <div key={i} className="ks-gamecard" onClick={() => handleGameClick(game)}>
//               <div className="ks-left">
//                 <div className="ks-time">
//                   <span className={`ks-status-icon ${game.playStatus ? 'running' : 'closed'}`}></span>
//                   <strong>{game.gameName}</strong>
//                 </div>
//                 <div className={`ks-status-text ${game.playStatus ? 'running' : 'closed'}`}>
//                   {game.playStatus ? 'Running Now' : 'Closed for Today'}
//                 </div>
//                 <div className="ks-bid-close">
//                   Bid closed at {game.closeTime}
//                 </div>
//               </div>
//               <div className="ks-right">
//                 <div className="ks-result">{game.result}</div>
//                 <button className="ks-play-btn" >▶</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ADDED: Render the modal when a closed game is selected */}
//       {closedGame && (
//         <StarlineClosedModal 
//           game={closedGame} 
//           onClose={() => setClosedGame(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default KingStarlineDashboard;




import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/KingStarline.css";
import "../css/mainhome.css";
import "../css/KingJackpot.css"; // (keep if other shared styles exist)
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import StarlineClosedModal from "../components/starlineclosedmodal";
import playIcon from "../assets/icons/play.png";
const KingStarlineDashboard = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [closedGame, setClosedGame] = useState(null);
  const { user } = useContext(AppContext);

  // Header stats (as shown in screenshot)
  const statItems = [
    { label: "Single Digit", value: "10/0" },
    { label: "Double Pana", value: "10/0" },
    { label: "Single Pana", value: "10/0" },
    { label: "Triple Pana", value: "10/0" },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const registerId = localStorage.getItem("registerId");
        if (!token || !registerId) return;

        const resp = await axios.post(
          "https://admin.gama567.club/api/v1/starline-game-list",
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

        if (resp?.data?.status && Array.isArray(resp.data.info)) {
          setGames(resp.data.info);
        } else {
          console.error("Unexpected starline response:", resp?.data);
        }
      } catch (e) {
        console.error("Error fetching starline games:", e);
      }
    };
    fetchGames();
  }, []);

  const handleGameClick = (game) => {
    if (!user?.accountStatus) {
      //alert("Your account is inactive. Please contact support.");
      return;
    }
    if (game.playStatus) {
      navigate(`/starline/${game.gameId}`, { state: { gameName: game.gameName } });
    } else {
      setClosedGame(game);
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="ksd-wrap">
        {/* ORANGE HEADER */}
        <header className="kjd-header">
          <button className="kjd-back" onClick={() => navigate(-1)} aria-label="Back">
            ‹
          </button>
          <div className="kjd-title">Main Starline</div>
          <button
            className="kjd-history"
            onClick={() => navigate("/bids/starline-result-history")}
          >
            <span className="clock" /> View History
          </button>
        </header>

        {/* WHITE STATS STRIP */}
        <div className="ksd-stats">
          {statItems.map((it, i) => (
            <div key={it.label} className="ksd-stat">
              <span className="lab">{it.label} :</span>
              <span className="val">{it.value}</span>
              {/* middle vertical divider between columns */}
              {(i === 1) && <i className="v-sep" aria-hidden />}
            </div>
          ))}
        </div>

        {/* SECTION HEAD */}
        <div className="ksd-headrow">
          <div className="title">Kalyan Starline</div>
          {/* <label className="kjd-toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider" />
            <span className="label">Notifications</span>
          </label> */}
        </div>

        {/* LIST */}
        <div className="ksd-list">
          {games.map((g) => {
            const running = !!g.playStatus;
            return (
              <div
                key={g.gameId}
                className="ksd-card"
                onClick={() => handleGameClick(g)}
                role="button"
              >
                <div className="ksd-left">
                  <div className="ksd-time">{g.gameName}</div>
                  <div className={`ksd-sub ${running ? "green" : "red"}`}>
                    {running ? "Running now" : "Closed for Today"}
                  </div>
                </div>

                <div className="ksd-mid">-</div>

                <div className="ksd-right">
                  <button
                    className="ksd-fab"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameClick(g);
                    }}
                    aria-label="Play Game"
                  >
                      <img src={playIcon} alt="" />
                  </button>
                  <div className="ksd-cap">Play Game</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {closedGame && (
        <StarlineClosedModal game={closedGame} onClose={() => setClosedGame(null)} />
      )}
    </div>
  );
};

export default KingStarlineDashboard;
