import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SetPin.css';
import { AppContext } from '../context/AppContext';
import iemg from "../assets/icons/set_mpin_avatar.png"
import axios from 'axios'
import AuthHeader from '../components/AuthHeader';
function SetPin() {
  const [pin, setPin] = useState('');
  const { setUserPin ,mobileNo  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSetPin = () => {
  if (pin.trim().length < 4) {
    alert('Please enter a valid 4‑digit mPin');
    return;
  }
  setUserPin(pin.trim());
  navigate('/verify-otp');
};


  return (
    <>
    <div className='mainhome-screen-wrapper'>
       <AuthHeader title="SET YOUR PIN" />
        <div className="mobile-wrapper">
   
      {/* ── Header (bar + text) ───────────────────── */}
      {/* <div className="header-row">
        <span className="side-bar" />
        <h2>
          SET YOUR <br /> PIN
        </h2>
      </div> */}
        
    <div className='jjj'>
      {/* ── Illustration ─────────────────────────── */}
      <div className="illu-box">
        <img src={iemg} alt="Set PIN" />
      </div>

      {/* ── Form (input + button) ────────────────── */}
      <div className="form-box">
        <label htmlFor="pin" className="pin-label">Enter New mPin</label>
        <input
          id="pin"
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          className="pin-input"
        />
        <button className="pin-btn" onClick={handleSetPin}>
          SET PIN
        </button>
      </div>
    </div>
    </div>
    </div>
    </>
   
  );
}

export default SetPin;
