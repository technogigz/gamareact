// src/screens/FundsScreen.jsx
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import "../css/FundsScreen.css";
import "../css/mainhome.css";
import { useState,useEffect } from "react";
import arrowIcon from "../assets/icons/Arrow-Right.svg";
import iconAdd from "../assets/icons/deposit.png";
import iconWithdraw from "../assets/icons/withdrawal.png";
import iconBank from "../assets/icons/bank.png";
import axios from "axios";
import { toast } from "react-toastify"; // 👈 1. IMPORT TOAST


export default function FundsScreen() {
  const navigate = useNavigate();          // ✅ now inside component
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchFeeSettings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
         const mobileNo = localStorage.getItem("mobileNo");
        const response = await axios.get(`https://sarra777.net/api/v1/fees-settings`, {
          data: {
            mobileNo: mobileNo, // ✅ body for GET (not recommended, but if backend accepts it)
          },
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "deviceId": "qwert",
            "deviceName": "sm2233",
            "accessStatus": "1",
          },
        });

        const { status, info } = response.data;
        if (status === true) {
          localStorage.setItem("feeSettings", JSON.stringify(info));
        }
      } catch (err) {
        console.error("Error fetching fee settings:", err);
      }
    };

    fetchFeeSettings();
  }, []);




  const handleWithdrawClick = () => {
    try {
      const settingsString = localStorage.getItem("feeSettings");
      if (!settingsString) {
        toast.error("Could not load settings. Please refresh.");
        return;
      }

      const settings = JSON.parse(settingsString);
      const { withdrawOpenTime, withdrawCloseTime, withdrawStatus } = settings;

      // First, check if withdrawals are enabled globally
      if (!withdrawStatus) {
        toast.warn("Withdrawals are temporarily disabled.");
        return;
      }

      // Helper to parse time strings like "7:30 AM"
      const parseTimeString = (timeStr) => {
        const [time, meridian] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (meridian.toLowerCase() === "pm" && hours < 12) hours += 12;
        if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;
        return { hours, minutes };
      };

      const now = new Date();
      const openTime = new Date();
      const closeTime = new Date();

      const open = parseTimeString(withdrawOpenTime);
      const close = parseTimeString(withdrawCloseTime);

      openTime.setHours(open.hours, open.minutes, 0, 0);
      closeTime.setHours(close.hours, close.minutes, 0, 0);

      // Now, check if the current time is within the window
      if (now >= openTime && now <= closeTime) {
        navigate("/funds/withdraw"); // Time is OK, proceed
      } else {
        toast.warn(
          `Withdrawal is only available from ${withdrawOpenTime} to ${withdrawCloseTime}.`
        );
      }
    } catch (error) {
      console.error("Error during withdrawal check:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  // items array can now reference `navigate`
  const items = [
    {
      icon: iconAdd,
      title: "Add Funds",
      desc: "You can add fund to your wallet",
      onClick: () => navigate("/funds/add"),
    },
    {
      icon: iconWithdraw,
      title: "Withdraw Fund",
      desc: "You can withdraw winnings",
      onClick: handleWithdrawClick,
    },
    {
      icon: iconBank,
      title: "Add Bank Details",
      desc: "You can add your bank details for withdrawals",
      onClick: () => navigate("/funds/addBankDetails"),
    },
    {
      icon: iconAdd,
      title: "Fund Deposit History",
      desc: "You can see history of your deposit",
      onClick: () => navigate("/funds/depositHistory"),
    },
    {
      icon: iconWithdraw,
      title: "Fund Withdraw History",
      desc: "You can see history of your fund withdrawals",
      onClick: () => navigate("/funds/WithdrawHistory"),
    }
    // {
    //   icon: iconBank,
    //   title: "Bank Changes History",
    //   desc: "You can see history of your bank accounts",
    //   onClick: () => console.log("Bank Changes History"),
    // },
  ];

  return (
    <div className="mainhome-screen-wrapper">
      <Header walletCount={5} onMenuClick={() => setSidebarOpen(true)} />

      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <div className="funds-content">
        {items.map(({ icon, title, desc, onClick }) => (
          <button className="funds-card" key={title} onClick={onClick}>
            <img src={icon} className="funds-icon" alt="" />
            <div className="funds-info">
              <div className="funds-title">{title}</div>
              <div className="funds-desc">{desc}</div>
            </div>
            <div className="arrow-btn">
              <img src={arrowIcon} alt=">" className="arrow-icon" />
            </div>
          </button>
        ))}
      </div>

      <BottomNav active="Funds" />
    </div>
  );
}
