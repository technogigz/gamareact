// // src/components/Header.jsx
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Header.css";
// import grp from "../assets/icons/Group8.png";
// import { AppContext } from "../context/AppContext"; 

// export default function Header({ onMenuClick, isAccountActive }) {
//   const navigate = useNavigate();
//   const { user } = useContext(AppContext);

//   return (
//     <header className="main-header">
//       {/* ── Hamburger + Logo ────────────────────────────────────────── */}
//       <div className="menu-logo">
//         <button className="icon-btn" onClick={onMenuClick}>
//           <span className="icon-hamburger" />
//         </button>

//         <img src={grp} alt="Sara777 logo" className="logo" />
//       </div>

//       {/* ── Right‑side Icons ───────────────────────────────────────── */}
//       {isAccountActive && (
//       <div className="header-icons">
//         {/* Wallet → /passbook */}
//         <button
//           className="icon-btn wallet-btn"
//           onClick={() => navigate("/passbook")}
//           aria-label="Passbook"
//         >
//           <span className="icon-wallet" />
//           {/* 5. Use the dynamic walletBalance from the user object */}
//           <span className="wallet-count">{user?.walletBalance || 0}</span>
//         </button>

//         {/* Bell → /notifications */}
//         <button
//           className="icon-btn"
//           onClick={() => navigate("/notifications")}
//           aria-label="Notifications"
//         >
//           <span className="icon-bell" />
//         </button>
//       </div>)}
//     </header>
//   );
// }



import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import grp from "../assets/icons/logoGama.png"; // This is your "Gama567" logo
import { AppContext } from "../context/AppContext"; 

export default function Header({ onMenuClick, isAccountActive }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <header className="main-header">
      {/* Left Side: Hamburger Menu + Logo */}
      <div className="menu-logo">
        <button className="icon-btn" onClick={onMenuClick}>
          <span className="icon-hamburger" />
        </button>
        <img src={grp} alt="Gama567 logo" className="logo" />
      </div>

      {/* Right Side: Icons */}
      {isAccountActive && (
        <div className="header-icons">
          {/* Wallet Button with Balance */}
          <button
            className="icon-btn wallet-btn"
            onClick={() => navigate("/passbook")}
            aria-label="Passbook"
          >
            <span className="icon-wallet" />
            <span className="wallet-balance">{user?.walletBalance || 0}</span>
          </button>

          {/* Notifications Button */}
          {/* <button
            className="icon-btn"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <span className="icon-bell" />
          </button> */}
        </div>
      )}
    </header>
  );
}