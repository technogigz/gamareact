import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/OtpVerify.css';
import { AppContext } from '../context/AppContext';
import jijij from '../assets/icons/verification_avatar.png';
import {toast} from "react-toastify";
import AuthHeader from '../components/AuthHeader';

const RESEND_DELAY = 240;

const OtpVerify = () => {
  const navigate = useNavigate();
  const { user, userPin, mobileNo,setUser } = useContext(AppContext);

  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);
  const [isLoading, setIsLoading] = useState(false);

  // 🔔 Send OTP on mount
  useEffect(() => {
    const sendOtp = async () => {
      try {
        const res = await axios.post('https://admin.gama567.club/api/v1/send-otp', { mobileNo });
        console.log('OTP API Response:', res.data);
        if (!res.data.status) {
         // alert('Failed to send OTP');
           toast.error('Failed to send OTP');
        }
      } catch (err) {
        console.error('OTP send error:', err);
        alert('Error sending OTP');
      }
    };

    if (mobileNo) sendOtp();
  }, [mobileNo]);

  // ⏱ Countdown for resend button
  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  // ✅ Verify OTP and complete registration
  const handleVerify = async () => {
    if (otp.length < 4) {
     // alert('Please enter the 4‑6 digit OTP');
       toast.warn('Please enter the 4-6 digits OTP.');
      return;
    }
          setIsLoading(true);
    try {
      const registerRes = await axios.post('https://admin.gama567.club/api/v1/user-register', {
        fullName: user,
        mobileNo,
        otp: parseInt(otp),
        security_pin: parseInt(userPin),
      });

      if (registerRes.data.status === true) {
         const { accessToken, registerId } = registerRes.data.info;
         localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('registerId', registerId);
         
           const profileRes = await axios.post(
          "https://admin.gama567.club/api/v1/user-details-by-register-id",
          { registerId },
          { headers: { "Authorization": `Bearer ${accessToken}`, /* ...other headers... */ } }
        );

         if (profileRes.data.status === true && profileRes.data.info) {
          const userInfo = profileRes.data.info;
   
             localStorage.setItem('userProfile', JSON.stringify(userInfo));
          localStorage.setItem('walletBalance', userInfo.walletBalance);
          setUser(userInfo); // Update the global context

          // Navigate directly to the home screen
          navigate("/home", { replace: true });
         }
          else {
          // This happens if profile fetch fails after successful registration
          //alert("Registration successful, but failed to load your profile. Please log in.");
            toast.warn('Registration successful, but failed to load your profile.');
          navigate("/login-with-mpin"); // Fallback to mpin login
        }


         

      } else {
      //  alert(registerRes.data.msg || 'Registration failed');
        toast.error('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    }
     finally {
      setIsLoading(false);
    }
  };

  // 🔁 Resend OTP logic
  const handleResend = async () => {
    if (secondsLeft > 0) return;

    try {
      const res = await axios.post('https://admin.gama567.club/api/v1/send-otp', { mobileNo });
      if (res.data.status === true) {
        setSecondsLeft(RESEND_DELAY);
      //  alert('OTP resent successfully!');
        toast.success('OTP resent successfully');
      } else {
        alert('Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend Error:', err);
      alert('Error resending OTP');
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      
        <AuthHeader title="VERIFY YOUR MOBILE NUMBER" />
      <div className="otp-container">
       
        {/* <div className="otp-heading">
          <span className="accent-bar" />
          <h2>
            VERIFY YOUR <br />
            <strong>MOBILE NUMBER</strong>
          </h2>
        </div> */}
 <div className='llll'>
        {/* <img src={jijij} alt="OTP Illustration" className="otp-image" /> */}

        <div className="otp-subtext">
          <h3>Verification Code</h3>
          <p>We have sent the code verification to your mobile number</p>
          <p className="otp-number">{mobileNo}</p>
        </div>

        <input
          type="text"
          className="otp-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
          }
        />

        <button className="otp-button" onClick={handleVerify}>
           {isLoading ? 'VERIFYING...' : 'VERIFY'}
        </button>

        {secondsLeft > 0 ? (
          <p className="otp-timer">
            Resend OTP in {formatTime(secondsLeft)}
          </p>
        ) : (
          <button className="otp-resend" onClick={handleResend}>
            Resend OTP
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default OtpVerify;
