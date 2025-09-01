import "./GameTimeModal.css";

export default function GameTimeModal({ game, onClose }) {
  if (!game) return null;
console.log(game);
  return (
    <div className="gametime-overlay">
      <div className="gametime-modal">
        <h2 className="gametime-title">{game.gameName}</h2>
        <p className="gametime-day">Monday</p>
        {/* <p className="gametime-status">Betting Is Closed For Today</p> */}
        
       <p className={`status-text ${!game.playStatus ? "closed" : "open"}`}>
          {!game.playStatus ? "Betting is Closed for Today" : "Betting is Running"}
        </p>

        <div className="gametime-grid">
          <div className="gametime-box">
            <h3>Open</h3>
            <div>
              <p>Open Result Time</p>
              <span>{game.openTime || "--:--"}</span>
            </div>
            <div>
              <p>Open Bid Last Time</p>
              <span>{game.openTime || "--:--"}</span>
            </div>
          </div>

          <div className="gametime-box">
            <h3>Close</h3>
            <div>
              <p>Close Result Time</p>
              <span>{game.closeTime || "--:--"}</span>
            </div>
            <div>
              <p>Close Bid Last Time</p>
              <span>{game.closeTime || "--:--"}</span>
            </div>
          </div>
        </div>

        <button className="gametime-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
