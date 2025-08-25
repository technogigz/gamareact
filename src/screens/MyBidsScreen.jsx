import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import "../css/mainhome.css"
import "../css/FundsScreen.css";
import arrowIcon from "../assets/icons/Arrow-Right.svg";
import BidHis from "../assets/icons/auction.png";
import Gamres from "../assets/icons/poker-game.png";
import Ban from "../assets/icons/bank.png";
import { useNavigate } from "react-router-dom";

export default function MyBidsScreen() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ now inside the component

  const bidItems = [
    {
      title: "BID HISTORY",
      desc: "You can view your market bid history",
      icon: BidHis,
      onClick: () => {navigate("/bid-history")}, // Add nav later
    },
    // {
    //   title: "Game Results",
    //   desc: "You can view your market result history",
    //   icon: Gamres,
    //   onClick: () => {},
    // },
    {
      title: "King Starline Bid History",
      desc: "You can view your starline bid history",
      icon: Ban,
      onClick: () => {navigate("/starline-bid-history")},
    },
    // {
    //   title: "King Starline Result History",
    //   desc: "You can view your starline result",
    //   icon: BidHis,
    //   onClick: () => navigate("/bids/starline-result-history"),
    // },
    {
      title: "KING JACKPOT BID HISTORY",
      desc: "You can view your jackpot bid history",
      icon: Gamres,
      onClick: () => {navigate("/jackpot-bid-history")},
    },
    // {
    //   title: "KING JACKPOT RESULT HISTORY",
    //   desc: "You can view your jackpot result",
    //   icon: Ban,
    //   onClick: () => navigate("/bids/jackpot-result-history"), // ✅ uses navigate properly now
    // },
  ];

  return (
    <div className="mainhome-screen-wrapper">
      <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)} />
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="funds-content">
        {bidItems.map((item) => (
          <button className="funds-card" key={item.title} onClick={item.onClick}>
            <img src={item.icon} className="funds-icon" alt="" />
            <div className="funds-info">
              <div className="funds-title">{item.title}</div>
              <div className="funds-desc">{item.desc}</div>
            </div>
            <div className="arrow-btn">
              <img src={arrowIcon} alt=">" className="arrow-icon" />
            </div>
          </button>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
