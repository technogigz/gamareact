



import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginWithMpin.css";
import logo from "../assets/icons/logoGama.png";
import "../css/mainhome.css";
import { AppContext } from "../context/AppContext";

export default function LoginWithMPin() {
  const [mpin, setMpin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // Get 'setUser' to update the global state after a successful login
  const { setUser } = useContext(AppContext);

  const handleLogin = async () => {
    setError("");
    if (mpin.trim().length !== 4) {
      setError("Enter a valid 4-digit mPIN");
      return;
    }

    setIsLoading(true);

    const registerId = localStorage.getItem("registerId");
    const accessToken = localStorage.getItem("accessToken");

    if (!registerId || !accessToken) {
      setError("Session expired. Please start over.");
      setTimeout(() => navigate("/enter-mobile"), 2000);
      setIsLoading(false);
      return;
    }

    try {
      // --- STEP 1: Verify the MPIN ---
      const verifyRes = await axios.post(
        "https://sarra777.net/api/v1/verify-mpin",
        { registerId, pinNo: parseInt(mpin) },
        {
          headers: {
            "deviceId": "qwert",
            "deviceName": "sm2233",
            "accessStatus": "1",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      // If PIN is incorrect, stop here.
      if (verifyRes.data.status !== true) {
        setError(verifyRes.data.msg || "Invalid mPIN.");
        setIsLoading(false);
        return;
      }

      // --- STEP 2: PIN is correct, now fetch the full user profile ---
      const profileRes = await axios.post(
        "https://sarra777.net/api/v1/user-details-by-register-id", // Your user profile endpoint
        { registerId },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "deviceId": "qwert",
            "deviceName": "sm2233",
            "accessStatus": "1",
          },
        }
      );

      if (profileRes.data.status === true && profileRes.data.info) {
        const userInfo = profileRes.data.info;

        // 3. Save the full user profile and wallet balance to localStorage.
        localStorage.setItem('userProfile', JSON.stringify(userInfo));
        localStorage.setItem('walletBalance', userInfo.walletBalance);
        
        // 4. Update the global context.
        setUser(userInfo);

        // 5. Now, it is safe to navigate to the home screen.
        navigate("/home", { replace: true });
      } else {
        // This would happen if the profile fetch failed after a successful PIN verification
        setError("Login successful, but failed to load profile. Please try again.");
      }

    } catch (err) {
      console.error("Login process failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="mpin-container">
        <img src={logo} alt="Sara777" className="mpin-logo" />
        <div className="mpin-card">
          <input
            type="password"
            placeholder="Login with mPIN"
            maxLength={4}
            className="mpin-input"
            value={mpin}
            onChange={(e) => setMpin(e.target.value.replace(/\D/g, ""))}
          />
          {error && <p className="mpin-error">{error}</p>}
          <button className="mpin-login-btn" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>
          <div className="mpin-forgot">
            <a href="/set-new-pin">Forgot M‑Pin?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
