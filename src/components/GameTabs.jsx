// src/components/GameTabs.jsx
import './GameTabs.css';
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function GameTabs({ isAccountActive }) {
  const navigate = useNavigate();
    const { user } = useContext(AppContext);
      if (!isAccountActive) {
    return null; // Render nothing if the account is not active
  }

  const handleJackpotClick = () => {
     if (!user?.accountStatus) {
      //alert("Your account is currently inactive. Please contact support.");
       // toast.error('Your account is currently inactive. Please contact support.');
      return; // Stop the function if the account is not active
    }
    navigate("/king-jackpot");
  };
  
  const handleStarlineClick = () => {
     if (!user?.accountStatus) {
      //alert("Your account is currently inactive. Please contact support.");
      //  toast.error('Your account is currently inactive.Please contact support.');
      return; // Stop the function if the account is not active
    }
    navigate("/king-starline");
  };

  return (
    <div className="game-tabs-wrapper">
      <button className="game-tab bgchanges " onClick={handleStarlineClick} disabled={!user?.accountStatus}>
        {/* <span className="iccon-play" /> */}
        Kalyan Starline
        <div className="playbts">
          <button className='btn_playebg bgrednone'>Play Now</button>
        </div>
      </button>

      <button className="game-tab bgchangeg2" onClick={handleJackpotClick} disabled={!user?.accountStatus}>
        {/* <span className="iccon-play" /> */}
        Kalyan Jackpot
         <div className="playbts">
          <button className='btn_playebg bgred'>Play Now</button>
        </div>
      </button>
    </div>
  );
}
