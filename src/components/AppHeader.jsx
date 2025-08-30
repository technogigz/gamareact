import { useNavigate } from "react-router-dom";
import "./AppHeader.css";
import walletIcon from "../assets/icons/wallet_figma1.svg";  // your wallet icon
import backIcon from "../assets/icons/back.png";      // your saved back icon

export default function AppHeader({ title = "", onBack, onWalletClick , walletBalance = 0 }) {
  const navigate = useNavigate();

  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <header className="app-header">
      {/* LEFT: back icon */}
      <button className="back-bttn" onClick={handleBack} aria-label="Back">
        <img src={backIcon} alt="Back" className="back-icon" />
      </button>

      {/* TITLE (left-aligned after back btn) */}
      <h1 className="headeer-title">{title}</h1>

      {/* RIGHT: wallet */}
      <button
        className="icon-btn circle"
        onClick={onWalletClick}
        aria-label="Wallet"
      >
        <img src={walletIcon} alt="Wallet" className="wallet-icon" />
         <span className="wallet-count">{walletBalance}</span>
      </button>
    </header>
  );
}
