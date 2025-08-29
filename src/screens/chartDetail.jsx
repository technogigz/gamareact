import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios"; // Import axios
import "../css/Charts.css";
import "../css/mainhome.css";

export default function ChartDetail() {
  // Get both the gameId and chartName from the URL
  const { gameId, chartName } = useParams();
  const navigate = useNavigate();
  
  // Add state for data, loading, and errors
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect now fetches real data
  useEffect(() => {
    // Make sure we have a gameId before fetching
    if (!gameId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          "https://admin.gama567.club/api/v1/table-chart", // Assuming this is the correct endpoint
          {
            gameId: parseInt(gameId, 10), // Send the gameId from the URL
            gameType: "game"
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
              "deviceId": "qwert",
              "deviceName": "sm2233",
              "accessStatus": "1",
            },
          }
        );
console.log(response);
        if (response.data.status && Array.isArray(response.data.info)) {
          setData(response.data.info);
        } else {
          throw new Error(response.data.msg || "Failed to fetch chart data.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Chart detail fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]); // Re-run the fetch if the gameId changes

  return (
    <div className="mainhome-screen-wrapper">
      <div className="charts-header screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBackOutline size={24} />
        </button>
        {/* Decode the URL slug back into a readable title */}
        <h2>{chartName.replace(/-/g, ' ').toUpperCase()}</h2>
      </div>

      <div className="chart-table-container screen-content">
        <div className="chart-table-header">
          <span>Date</span>
          <span>Open</span>
          <span>Jodi</span>
          <span>Close</span>
        </div>

        {loading && <p className="chart-message">Loading chart...</p>}
        {error && <p className="chart-message error">{error}</p>}
        {!loading && !error && data.length === 0 && (
            <p className="chart-message">No chart data available.</p>
        )}

        <div className="chart-table-body">
          {data.map((row, idx) => (
            <div key={idx} className="chart-row">
              <span>{row.date}</span>
              <span>{row.open}</span>
              {/* The API response uses 'digit' for the Jodi value */}
              <span className="jodi">{row.digit}</span>
              <span>{row.close}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}