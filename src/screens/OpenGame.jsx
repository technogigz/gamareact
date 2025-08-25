import { useEffect, useState } from "react";
// CHANGED: Added useParams to read URL parameters
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../css/OpenGame.css";
import backIcon from "../assets/icons/icons8-back-50.png";
import "../css/mainhome.css";
import InfoModal from "../components/infoModal";

export default function OpenGame() {
  const [gameTypes, setGameTypes] = useState([]);
  const navigate = useNavigate();

  // --- NEW: Getting data from the route ---
  const { marketId } = useParams(); // Get the numeric ID from the URL, e.g., "123"
  const location = useLocation(); // Get state passed from the previous page

  // --- UPDATED: More robust way to set the title ---
  // Uses the name from the previous page, or falls back to the ID if refreshed
  const [isBidTimePassed, setIsBidTimePassed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const gameTitle = location.state?.gameName || `Market ${marketId}`;
   const openBidTime = location.state?.openBidTime;

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        const mobileNo=localStorage.getItem("mobileNo")
        // CORRECTED: The structure of the axios GET request
        const res = await axios.get(
          "https://sarra777.net/api/v1/game-bid-type",
          {
            params: {
              mobileNo: mobileNo
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              deviceId: "qwert",
              deviceName: "sm2233",
              accessStatus: "1",
            },
          }
        );

        if (res.data.status && Array.isArray(res.data.info)) {
          setGameTypes(res.data.info);
        } else {
          console.error("Invalid API response:", res.data);
        }
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchGameTypes();

     if (openBidTime) { // e.g., openBidTime is "10:50 AM"
  
  // 1. Get the current moment
  const now = new Date();
  
  // 2. Create a separate date object for the bid time
  const bidTime = new Date(now);

  // 3. Reliably parse the hours, minutes, and AM/PM
  const timeParts = openBidTime.match(/(\d+):(\d+)\s+(AM|PM)/i);
  if (timeParts) {
    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const ampm = timeParts[3].toUpperCase();

    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    }
    if (ampm === 'AM' && hours === 12) { // Handle midnight case (12 AM = 00 hours)
      hours = 0;
    }
    
    // 4. Set the parsed time on the bidTime object
    bidTime.setHours(hours, minutes, 0, 0);
        
    // 5. Now the comparison is accurate
    if (now > bidTime) {
      setIsBidTimePassed(true);
    }
  }
}

  }, [openBidTime]); // The empty dependency array is correct here

  // --- UPDATED: The core navigation logic ---
  // const handleCardClick = (game) => {
  //   // Use the 'type' property directly from the API response. No more string manipulation.
  // const gameTypeKey = game.type;

  // // The rest of the logic is the same.
  //  navigate(`/bid/market/${marketId}/${gameTypeKey}`, {
  //   state: { marketName: gameTitle } // Pass the market name forward
  // });
  // };


   const handleCardClick = (game) => {
        if (isBidTimePassed) {
            // If time has passed AND the game has open/closed sessions...
            if (game.sessionSelection === true) {
                // ...navigate, but also pass a flag to the next screen.
                navigate(`/bid/market/${marketId}/${game.type}`, {
                    state: { marketName: gameTitle, openBidDisabled: true, sessionSelection: game.sessionSelection  },
                });
            }
            // If time has passed AND the game does NOT have sessions...
            else if (game.sessionSelection === false) {
                // ...show a popup and stop.
                setModalMessage(`The market for ${game.name} is currently closed.`);
                setIsModalOpen(true);
                 return;
            }
        } else {
            // If bid time has NOT passed, navigate normally.
            navigate(`/bid/market/${marketId}/${game.type}`, {
                state: { marketName: gameTitle, openBidDisabled: false ,sessionSelection: game.sessionSelection},
            });
        }
    };



     const gradients = [
  "linear-gradient(135deg, #ff9a9e, #fad0c4)",   // pink-red
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",   // purple-pink
  "linear-gradient(135deg, #fbc2eb, #a6c1ee)",   // pink-blue
  "linear-gradient(135deg, #84fab0, #8fd3f4)",   // green-blue
  "linear-gradient(135deg, #ffecd2, #fcb69f)",   // orange
  "linear-gradient(135deg, #cfd9df, #e2ebf0)",   // soft gray-blue
  "linear-gradient(135deg, #fddb92, #d1fdff)",   // yellow-blue
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

  return (
    <div className="mainhome-screen-wrapper">
      <div className="open-game-container">
        <div className="top-bar">
          <img src={backIcon} alt="Back" onClick={() => navigate(-1)} />
          <h2>{gameTitle}</h2>
        </div>

        <div className="game-grid">
          {gameTypes.map((type) => (
            <div
              className="game-carrd"
              key={type.id}
              // UPDATED: Pass the entire game object to the handler
               style={{ background: getRandomGradient() }}
              onClick={() => handleCardClick(type)}
            >
              <div className="icon-wrapper">
                <img src={type.image} alt={type.name} />
              </div>
              <p>{type.name}</p>
            </div>
          ))}
        </div>
      </div>
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Market Closed"
        message={modalMessage}
      />
    </div>
  );
}