import React, { useState ,useRef} from "react";
import "../css/ResultHistoryJackpot.css";
import "../css/mainhome.css"
import { useNavigate } from "react-router-dom";
const resultSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
];

const KingJackpotResultHistory = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  const inputRef = useRef(null);
  const navigate=useNavigate();
  return (
    <div className="mainhome-screen-wrapper">
    <div className="kjrh-container">
      {/* Header */}
      <div className="kjrh-header">
        <button className="kjrh-back" onClick={() => navigate(-1)}>‹</button>
        <h3>King Jackpot Result History</h3>
        <button className="kjrh-icon">📋</button>
      </div>

      {/* Date Selection */}
      <div className="kjrh-date-row">
  <label>Select Date</label>
  <div
    className="custom-date-display"
    onClick={() => inputRef.current.showPicker()}
  >
    {selectedDate.split("-").reverse().join("-")}
  </div>
  <input
    ref={inputRef}
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
  />
</div>
      {/* Result List */}
      <div className="kjrh-slot-list">
        {resultSlots.map((time, i) => (
          <div className="kjrh-slot" key={i}>
            <span className="kjrh-time">{time}</span>
            <span className="kjrh-result">**</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default KingJackpotResultHistory;
