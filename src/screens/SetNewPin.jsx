import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "../css/SetNewPin.css";
import "../css/mainhome.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import AuthHeader from "../components/AuthHeader";
import kkko from '../assets/icons/app.png';
export default function SetNewPinScreen() {
  const { mobileNo } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [seconds, setSec] = useState(240);
  const hasSentOtp = useRef(false);
  const navigate = useNavigate();

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("otpSent");
    };
  }, []);

  // ⏱ Timer logic
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  // ✅ OTP send logic with full guard
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await axios.post("https://admin.gama567.club/api/v1/send-otp", { mobileNo });
        console.log("✅ OTP sent:", res.data);
        hasSentOtp.current = true;
        sessionStorage.setItem("otpSent", "true");
      } catch (err) {
        console.error("❌ Error sending OTP:", err);
        alert("Failed to send OTP. Please try again.");
      }
    };

    const otpAlreadySent = sessionStorage.getItem("otpSent") === "true";

    if (
      mobileNo &&
      mobileNo.length === 10 &&
      !hasSentOtp.current &&
      !otpAlreadySent
    ) {
      console.log("🚀 Sending OTP to:", mobileNo);
      sendOtp();
    } else {
      console.log("🛑 Skipping OTP send", {
        mobileNo,
        hasSent: hasSentOtp.current,
        otpAlreadySent,
      });
    }
  }, [mobileNo]);

  const handleSetPin = async () => {
    if (!otp || !pin) {
      alert("Please enter both OTP and new PIN.");
      return;
    }

    try {
      const res = await axios.post("https://admin.gama567.club/api/v1/reset-mpin", {
        mobileNo,
        otp: parseInt(otp),
        security_pin: parseInt(pin),
      });
          console.log("thisssss  ",res)
      if (res.data.status === true) {
        const { registerId, accessToken } = res.data.info;

        localStorage.setItem("registerId", registerId);
       localStorage.setItem("accessToken", accessToken);

       // alert("PIN reset successful!");
         toast.success('Pin reset successful.');
        navigate("/login-with-mpin",{ replace: true });
      } else {
        alert(res.data.msg || "Reset failed.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="mainhome-screen-wrapper">
       <AuthHeader title="SET NEW PIN" />
      <div className="setpin-content-wrapper">
        {/* <div className="heading-row">
          <span className="accent-bar" />
          <h1>
            SET NEW<br />PIN
          </h1>
        </div> */}

        <div className="logo-image-wrapper">
          <img
            src={kkko}
            alt="Sara777 Logo"
            className="sararr"
          />
        </div>
         

        {/* <label className="field-label">Enter OTP</label> */}
        <input
          type="text"
          className="text-input"
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          maxLength={6}
        />

        {/* <label className="field-label">Enter New mPin</label> */}
        <input
          type="password"
          className="text-input"
          placeholder="Enter New MPIN"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          maxLength={4}
        />

        <button className="setpin-btn" onClick={handleSetPin}>
          SET PIN
        </button>

        {seconds > 0 ? (
          <p className="resend-text">Resend OTP in {mm}:{ss}</p>
        ) : (
          <button
            className="resend-link"
            onClick={async () => {
              try {
                await axios.post("https://admin.gama567.club/api/v1/send-otp", { mobileNo });
                setSec(240);
                hasSentOtp.current = true;
                sessionStorage.setItem("otpSent", "true");
              } catch (err) {
                console.error("Resend failed:", err);
                alert("Resend failed.");
              }
            }}
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
