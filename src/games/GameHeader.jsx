import React from 'react';
import {  BackArrowIcon } from './GameIcons';
//import { WalletIcon } from '../assets/icons/wallet_figma.png';
import walletImg from '../assets/icons/walletCard.png'
import "./GamesScreen.css"
// Add the onBackClick prop back in
const Header = ({ title, walletBalance, onBackClick }) => (
  <header className="game-header">
    <div className="header-left">
      <button className="back-button" onClick={onBackClick}>
        <BackArrowIcon />
      </button>
    </div>
    <div className="header-center">
      <span className="header-title">{title}</span>
    </div>
    <div className="header-right">
      
<div className="wallet-display">
     <img src={walletImg} alt="Wallet" className="wallet-icon" />
      <span>{walletBalance}</span>
     </div>
    </div>
  </header>
);

export default Header;