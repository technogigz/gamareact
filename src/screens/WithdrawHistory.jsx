import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/DepositHistory.css";
import "../css/mainhome.css";

export default function WithdrawHistoryScreen() {
  const nav = useNavigate();
  // State for withdrawals, loading, and errors
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const registerId = localStorage.getItem("registerId");

        if (!token || !registerId) {
          alert("Missing token or registerId.");
          setLoading(false);
          return;
        }

        // API call to the withdrawal history endpoint
        const res = await axios.post(
          "https://sarra777.net/api/v1/withdrawal-fund-history", // Assumed endpoint for withdrawals
          {
            registerId,
            pageIndex: 1,
            recordLimit: 999,
          },
          {
            headers: {
              "deviceId": "qwert",
              "deviceName": "sm2233",
              "accessStatus": "1",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        const list = res.data?.info?.list || [];
        // Map the API response to a consistent format
        const mapped = list.map((item) => ({
          txId: item.txId,
          ts: item.requestDate,
          amount: item.amount,
          narration: item.remark,
          status: item.statusText,
        }));

        setWithdrawals(mapped);
      } catch (error) {
        console.error("Error fetching withdraw history:", error);
        alert("Failed to load withdraw history");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="mainhome-screen-wrapper">
      <div className="history-page">
        {/* header */}
        <header className="history-header">
          <button className="back-btn" onClick={() => nav(-1)}>‹</button>
          <h2>Fund Withdraw History</h2>
        </header>

        {/* body */}
        <div className="history-body">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : withdrawals.length === 0 ? (
            <p className="empty">No withdraw history found.</p>
          ) : (
            withdrawals.map((item) => (
              <div className="history-item" key={item.txId}>
                {/* row 1: timestamp + status */}
                <div className="history-row">
                  <span className="timestamp">{item.ts}</span>
                  <span className="statuus">
                    <span className="check">✔</span> {item.status}
                  </span>
                </div>

                <hr />

                {/* row 2: amount */}
                <div className="history-row">
                  <span className="label">Amount</span>
                  <span className="value amount">₹ {item.amount}</span>
                </div>

                {/* row 3: narration */}
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