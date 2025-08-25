import React from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import "../css/GameRates.css"
import Sidebar from "../components/SideBar";
import "../css/mainhome.css"; 
import { useState } from "react"; 
export default function GameRatesScreen() {
  const commonBids = [
    "Single - 10/95",
    "Jodi - 10/950",
    "Single Panna - 10/1400",
    "Double Panna - 10/2800",
    "Triple Panna - 10/7000",
    "Half Sangam - 10/10000",
    "Full Sangam - 10/100000",
  ];

  const kingStarline = [
    "Single - 10/95",
    "Single Panna - 10/1400",
    "Double Panna - 10/2800",
  ];

  const kingJackpot = [
    "Single - 10/95",
    "Jodi - 10/950",
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="mainhome-screen-wrapper">
       <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)} />
            
                  {/* ⬅️ Move Sidebar here */}
                  {isSidebarOpen && (
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
                  )}
      
      <div className="rates-container">
        <Section title="Game Win Ratio for All Bids" data={commonBids} />
        <Section title="King Starline Game Win Ratio" data={kingStarline} />
        <Section title="King Jackpot Win Ratio" data={kingJackpot} />

      </div>
      <BottomNav />
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div className="rate-section">
      <div className="rate-header">{title}</div>
      {data.map((item, index) => (
        <div className="rate-card" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
