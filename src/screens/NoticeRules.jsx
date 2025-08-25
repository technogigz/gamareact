import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";
import "../css/NoticeRules.css";
import "../css/mainhome.css"; 
import { useState } from "react";  // for the phone‑frame wrapper

export default function NoticeRulesScreen() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="mainhome-screen-wrapper">
       <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)} />
            
                  {/* ⬅️ Move Sidebar here */}
                  {isSidebarOpen && (
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
                  )}

      {/* Scrollable content */}
      <div className="notice-content">
        <h2 className="page-title">Information</h2>

        {/* Withdraw Info */}
        <section className="notice-section">
          <h3 className="section-title">Withdraw Information</h3>
          <ul>
            <li>👍 If user entered wrong bank details, Sara777 is not responsible.</li>
            <li>👍 Before requesting withdraw, re‑check your bank details.</li>
            <li>👍 If wallet balance is insufficient, withdraw request will be auto‑declined.</li>
          </ul>
        </section>

        {/* WhatsApp row */}
        <div className="wa-row">
          <span className="wa-icon" />
          919649115777
        </div>

        {/* Unfair Bets */}
        <section className="notice-section">
          <h3 className="section-title">Unfair Bets</h3>
          <p>
            If admin finds any unfair bets, blocking of digits, canning, or match‑fix bets,
            admin has all right to take necessary action to block the user.
          </p>
        </section>

        {/* Cheating Bets */}
        <section className="notice-section">
          <h3 className="section-title">Cheating Bets</h3>
          <p>
            If admin finds any cheating, hacking, or phishing, admin has all right to
            take necessary action to block the user.
          </p>
        </section>
      </div>

      <BottomNav active="Home" />
    </div>
  );
}
