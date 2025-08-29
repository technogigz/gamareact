// src/screens/DepositHistoryScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/DepositHistory.css";
import "../css/mainhome.css";

export default function DepositHistoryScreen() {
  const nav = useNavigate();
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const registerId = localStorage.getItem("registerId");

      if (!token || !registerId) {
        alert("Missing token or registerId.");
        return;
      }

      const res = await axios.post(
        "https://admin.gama567.club/api/v1/deposit-fund-history",
        {
          registerId,
          pageIndex: 1,
          recordLimit: 999,
        },
        {
          headers: {
            "deviceId": "qwert", // Replace with real device ID if available
            "deviceName": "sm2233", // Replace with actual device info
            "accessStatus": "1",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const list = res.data?.info?.list || [];
      console.log(list);
      const mapped = list.map((item, idx) => ({
       txId: item.txId,
        ts: item.requestDate,
        amount: item.amount,
        narration: item.remark,
        status: item.statusText,
      }));

      setDeposits(mapped);
    } catch (error) {
      console.error("Error fetching deposit history:", error);
      alert("Failed to load deposit history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  return (
    <div className="mainhome-screen-wrapper">
      <div className="history-page">
        {/* header */}
        <header className="history-header">
          <button className="back-btn" onClick={() => nav(-1)}>‹</button>
          <h2>Fund Deposit History</h2>
        </header>

        {/* body */}
        <div className="history-body">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : deposits.length === 0 ? (
            <p className="empty">No deposit history found.</p>
          ) : (
            deposits.map((item) => (
              <div className="history-item" key={item.txId}>
                <div className="history-row">
                  <span className="timestamp">{item.ts}</span>
                  <span className="statuus">
                    <span className="check">✔</span> {item.status}
                  </span>
                </div>

                <hr />

                <div className="history-row">
                  <span className="label">Amount</span>
                  <span className="value amount">₹ {item.amount}</span>
                </div>

                <div className="history-row">
                  <span className="label">Narration</span>
                  <span className="value narration">{item.narration}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
