// import { useState, useEffect,useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../css/KingJackpot.css";
// import "../css/mainhome.css";
// import clock from "../assets/icons/stopwatch.png";
// import cloock from "../assets/icons/chronometer.png";
// import { AppContext } from "../context/AppContext"; // 2. Import your context

// import StarlineClosedModal from '../components/starlineclosedmodal';

// export default function KingJackpotScreen() {
//   const navigate = useNavigate();
//   // const [showClosedModal, setShowClosedModal] = useState(false);
//   // const [closedGameTime, setClosedGameTime] = useState("");
//   const [gameList, setGameList] = useState([]);
//    const [closedGame, setClosedGame] = useState(null); 
//    const { user } = useContext(AppContext);

//   useEffect(() => {
//     const fetchJackpotGames = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const registerId = localStorage.getItem("registerId");

//         if (!token || !registerId) {
//           console.error("Missing token or registerId");
//           return;
//         }

//         const response = await axios.post(
//           "https://admin.gama567.club/api/v1/jackpot-game-list", // 🔁 Replace with real URL
//           {
//             registerId: registerId,
//           },
//           {
//             headers: {
//               deviceId: "qwert",
//               deviceName: "sm2233",
//               accessStatus: "1",
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data?.status && Array.isArray(response.data.info)) {
//           const formatted = response.data.info.map((g) => ({
//             gameId:g.gameId,
//             time: g.gameName,
//             result: g.result,
//             closed: !g.playStatus,
//             statusText: g.playStatus ? "Running Now" : "Closed for Today",
//             statusColor: g.playStatus ? "green" : "red",
//             closeTime: g.closeTime,
//             openTime:g.openTime
//           }));
//           setGameList(formatted);
//         } else {
//           console.error("Invalid response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching jackpot games:", error);
//       }
//     };

//     fetchJackpotGames();
//   }, []);

//   const handleGameClick = (game) => {
//     if (!user?.accountStatus) {
//       alert("Your account is inactive. Please contact support.");
//       return;
//     }

//     if (!game.closed) { // Check the 'closed' property from your formatted data
//       // Navigate to the jackpot game selection screen
//       navigate(`/jackpot/${game.gameId}`, { 
//         state: { gameName: game.gameName } 
//       });
//     } else {
//       // If the game is closed, show the modal
//       setClosedGame(game);
//     }
//   };

//   return (
//     <div className="mainhome-screen-wrapper">
//       <div className="kj-screen">
//         {/* Header */}
//         <div className="kj-header">
//           <div className="kj-header-top">
//             <div className="kj-header-left">
//               <button className="kj-back" onClick={() => navigate(-1)}>‹</button>
//               <h2>King Jackpot</h2>
//             </div>
//           </div>
//           <div className="kj-header-bottom">
//             <div className="kj-history">
//               <button className="icon-calendar" onClick={()=>navigate('/bids/jackpot-result-history')}/>
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
//         </div>

//         {/* Tabs */}
//         <div className="kj-tabs">
//           <span className="tab active">Jodi 1-{gameList.length}</span>
//         </div>

//         {/* Cards */}
//         <div className="kj-body">
//           {gameList.map((g) => (
//             <div
//               className="kj-card"
//               key={g.time}
//               onClick={() => handleGameClick(g)}
//             >
//               <div className="kj-time-row">
//                 <span>{g.time}</span>
//                 <span className="kj-icon">
//                   <img
//                     src={g.closed ? clock : cloock}
//                     alt={g.closed ? "Closed" : "Open"}
//                     className="kj-icon-img"
//                   />
//                 </span>
//               </div>
//               <div className="kj-number">{g.result}</div>
//               <div className={`kj-status ${g.statusColor}`}>{g.statusText}</div>
//               <button className={`kj-button ${g.statusColor}`}>
//                 ▶ Play Game
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       {closedGame && (
//         <StarlineClosedModal 
//           game={closedGame} 
//           onClose={() => setClosedGame(null)} 
//         />
//       )}
//     </div>
//   );
// }




import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/KingJackpot.css";
import "../css/mainhome.css";
import clock from "../assets/icons/stopwatch.png";
import cloock from "../assets/icons/chronometer.png";
import { AppContext } from "../context/AppContext";
import StarlineClosedModal from "../components/starlineclosedmodal";

export default function KingJackpotScreen() {
  const navigate = useNavigate();
  const [gameList, setGameList] = useState([]);
  const [closedGame, setClosedGame] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchJackpotGames = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const registerId = localStorage.getItem("registerId");
        if (!token || !registerId) return;

        const response = await axios.post(
          "https://admin.gama567.club/api/v1/jackpot-game-list",
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

        if (response?.data?.status && Array.isArray(response.data.info)) {
          const formatted = response.data.info.map((g) => ({
            gameId: g.gameId,
            gameName: g.gameName,
            time: g.gameName, // shown as “10:00 am” etc
            result: g.result || "-",
            closed: !g.playStatus,
            statusText: g.playStatus
              ? "Betting is Running now"
              : "Betting is Closed for Today",
          }));
          setGameList(formatted);
        }
      } catch (e) {
        console.error("Error fetching jackpot games:", e);
      }
    };

    fetchJackpotGames();
  }, []);

  const handleGameClick = (game) => {
    if (!user?.accountStatus) {
     // alert("Your account is inactive. Please contact support.");
      return;
    }
    if (game.closed) {
      setClosedGame(game);
      return;
    }
    navigate(`/jackpot/${game.gameId}`, { state: { gameName: game.gameName } });
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="kjd-wrap">
        {/* Orange header like screenshot */}
        <header className="kjd-header">
          <button className="kjd-back" onClick={() => navigate(-1)} aria-label="Back">
            ‹
          </button>
          <div className="kjd-title">Jackpot Dashboard</div>
          <button
            className="kjd-history"
            onClick={() => navigate("/bids/jackpot-result-history")}
          >
            <span className="clock" /> View History
          </button>
        </header>

        {/* white strip with jodi count */}
        <div className="kjd-strip">
          <span>Jodi : <b>10/0</b></span>
        </div>

        {/* section head row */}
        <div className="kjd-section-head">
          <div className="kjd-section-title">Kalyan Jackpot</div>
          {/* <label className="kjd-toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider" />
            <span className="label">Notifications</span>
          </label> */}
        </div>

        {/* 2-column grid of cards */}
        <div className="jackpot-grid">
          {gameList.map((g) => {
            const stateClass = g.closed ? "state-closed" : "state-open";
            return (
              <div
                key={g.gameId + g.time}
                className={`jackpot-card ${stateClass}`}
                onClick={() => handleGameClick(g)}
                role="button"
              >
                <span className={`stripe ${g.closed ? "orange" : "green"}`} />

                <div className="row-top">
                  <img
                    src={g.closed ? clock : cloock}
                    className="alarm"
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="time">{g.time}</span>
                </div>

                <div className="result">{g.result}</div>

                <div className={`status ${g.closed ? "red" : "green"}`}>
                  {g.statusText}
                </div>

                {!g.closed && (
                  <button
                    className="cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameClick(g);
                    }}
                  >
                    PLAY NOW
                  </button>
                )}
              </div>
            );
          })}
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
