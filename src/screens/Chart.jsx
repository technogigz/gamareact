import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoSearch } from "react-icons/io5";
import axios from "axios"; // Import axios
import "../css/Charts.css";
import "../css/mainhome.css";

export default function ChartsScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  // 1. Add state for charts from the API and a loading indicator
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch charts from the API when the component mounts
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const registerId = localStorage.getItem("registerId");
        const mobileNo=localStorage.getItem("mobileNo")
        if (!token || !registerId) {
          throw new Error("User is not authenticated.");
        }
        
        // This is the same API call from your MainHome screen
        const response = await axios.get(
          "https://admin.gama567.club/api/v1/chart-game-list",
          { mobileNo :mobileNo},
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
          setCharts(response.data.info); // Store the array of chart objects
        } else {
          throw new Error(response.data.msg || "Failed to fetch chart list.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Chart list fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []); // The empty array ensures this runs only once

  // 3. Update filtering to work with the array of objects from the API
  const filteredCharts = charts.filter(chart =>
    chart.gameName.toLowerCase().includes(query.toLowerCase())
  );

  // Helper function to create a URL-friendly slug
  const createSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mainhome-screen-wrapper">
      <div className="charts-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBackOutline size={24} />
        </button>
        <h2>Charts</h2>
      </div>

      <div className="search-box">
        <IoSearch size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search chart"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* 4. Update the JSX to handle loading/error states and map over API data */}
      <div className="chart-grid screen-content">
        {loading && <p className="chart-message">Loading charts...</p>}
        {error && <p className="chart-message error">{error}</p>}
        {!loading && !error && (
          filteredCharts.map(chart => (
            <button
              key={chart.gameId}
              className="chart-btn"
              // Use a URL-friendly slug for navigation
              onClick={() => navigate(`/charts/${chart.gameId}/${createSlug(chart.gameName)}`)}
            >
              {chart.gameName}
            </button>
          ))
        )}
      </div>
    </div>
  );
}