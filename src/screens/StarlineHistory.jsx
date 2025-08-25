



import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/BidHistory.css";
import {toast} from "react-toastify";
export default function BidHistoryScreen() {
  const nav = useNavigate();
  const [bids, setBids] = useState([]);
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: 'YYYY-MM-DD'
  });

  const fetchBids = useCallback(async () => {
    try {
      const registerId = localStorage.getItem("registerId");
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        "https://sarra777.net/api/v1/bet-history",
        {
          registerId,
          pageIndex: 1,
          recordLimit: 100,
          placeType: "starline",
          fromDate: fromDate,
        },
        {
          headers: {
            deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status && Array.isArray(res.data.info?.list)) {
        setBids(res.data.info.list);
      } else {
        setBids([]);
       // alert(res.data.msg || "No bids found.");
         toast.error('No bids found.');
      }
    } catch (err) {
      console.error("Error fetching bids:", err);
      alert("Error fetching bid history.");
    }
  }, [fromDate]);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const handleDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const formattedDisplayDate = () => {
    const [yyyy, mm, dd] = fromDate.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div className="mainhome-screen-wrapper">
      {/* <div className="bid-history-page"> */}
        {/* Header */}
        <header className="bid-header">
          <button className="back-btn" onClick={() => nav(-1)}>‹</button>
          <h3>
           Starline Bid History<br />
            <span>(From: {formattedDisplayDate()})</span>
          </h3>

          {/* Calendar input styled as icon */}
          <label className="calendar-btn" title="Select Date">
            📅
            <input
              type="date"
              value={fromDate}
              onChange={handleDateChange}
              className="calendar-input"
            />
          </label>
        </header>

        {/* Bid List */}
        <div className="bid-list">
          {bids.map((item, idx) => (
            <div className="bid-card" key={idx}>
              <div className="bid-card-header">
                <div>
                  <div className="game-name">{item.title}</div>
                  <div className="game-type">{item.gameType}
                     <span className="selected-digit">({item.selectedDigit})</span>
                  </div>
                   
                </div>
                <div className="amount">
                  Amount<br />{item.bidAmount}
                </div>
              </div>

              <div className="bid-details">
                <div className="row">
                  <span className="label">Bid Date</span>
                  <span className="value">{item.bidDate}</span>
                </div>
                <div className="row">
                  <span className="label">Bid Time</span>
                  <span className="value">{item.bidTime}</span>
                </div>
                <div className="row">
                  <span className="label">Bid ID</span>
                  <span className="value">{item.bidId}</span>
                </div>
              </div>

              <div className="luck-msg">{item.statusText || "Best Of Luck"}</div>
            </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
}
