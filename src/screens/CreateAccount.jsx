import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateAccount.css';
import { AppContext } from '../context/AppContext';
import SaraLogo from "../assets/icons/logoGama.png";
import jjlogo from "../assets/icons/bank.png"
function CreateAccount() {
  const [username, setUsername] = useState('');
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleNext = () => {
  if (username.trim()) {
    if (setUser) {
      setUser(username.trim());
      navigate('/set-pin');
    } else {
      console.error('setUser is not defined in AppContext');
      alert('Something went wrong. Please restart the app.');
    }
  } else {
    alert('Please enter a username');
  }
};

  return (
    <div className="mobile-screen-wrapper">
      <div className="create-account-page">
        {/* Header */}
        <div className="header-section">
  <div className="bar" />
  <div className="header-text">
    <h2>
      CREATE YOUR NEW <br /> ACCOUNT
    </h2>
  </div>
</div>


        {/* Logo */}
        <div className="logo-image-wrapper">
          <img
            src={SaraLogo}
            alt="Sara777 Logo"
            className="sara-logo-img"
          />
        </div>

        {/* Input + Button */}
        <div className="form-section">
          <div className="input-box">
            <img src={jjlogo} alt="icon" className="inpuut-icon" />
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button className="next-btn" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
