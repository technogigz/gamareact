




import React, { useState, useContext ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MobileEntry.css';
import kkko from '../assets/icons/phone_avatar.png';
import { AppContext } from '../context/AppContext'; // 1. Re-import the context
import { toast } from 'react-toastify';
const MobileEntry = () => {
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // 2. Get the setMobileNo function from the context
  const { setMobileNo } = useContext(AppContext);


  // useEffect(() => {
  //   // Check if the user has logged in before
  //   const accessToken = localStorage.getItem('accessToken');
  //   const registerId = localStorage.getItem('registerId');

  //   // If tokens exist, the user is returning, so redirect to the MPIN screen
  //   if (accessToken && registerId) {
  //     navigate('/login-with-mpin', { replace: true });
  //   }
  // }, [navigate]);



  const handleNext = async () => {
    if (phone.length !== 10) {
     // alert('Please enter a valid 10-digit phone number.');
       toast.warn('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const res = await axios.post('https://sarra777.net/api/v1/check-mobile', { mobileNo: phone },
        {
          headers: {
           
            "Content-Type": "application/json",
          },
        });
         console.log(res);
      // 3. Store the mobile number in the context in ALL cases
      setMobileNo(phone); 

      if (res.data.status === true) {
        // User exists, show the recovery modal
        setShowModal(true);
      } else {
        // User does not exist, navigate to create account
        // The mobile number is now available in the context for the next screens
        navigate('/create-account',{ replace: true });
      }
    } catch (error) {
     // alert('Something went wrong. Please try again.');
       toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleRecover = () => {
    // The mobile number is already in the context, so we can just navigate
    navigate('/set-new-pin');
  };

  return (
    <div className="mobile-entry-wrapper">
      <div className="mobile-entry-container">
        <div className="mobile-entry-heading">
          <span className="accent-bar" />
          <h2>
            ENTER YOUR <br />
            <strong>MOBILE NUMBER</strong>
          </h2>
        </div>

        <img src={kkko} alt="Illustration" className="mobile-entry-image" />

        <div className="mobile-input-container">
          <span className="mobile-icon">🏦</span>
          <input
            type="tel"
            className="mobile-input"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
          />
        </div>

        <button className="mobile-next-button" onClick={handleNext}>
          NEXT
        </button>
      </div>

      {/* Recovery Modal */}
      {showModal && (
        <div className="mobile-recover-modal">
          <div className="modal-content">
            <h3>Account Recovery</h3>
            <p>Recover your existing account by providing generated OTP</p>
            <p>Do you want to continue?</p>
            <button className="recover-button" onClick={handleRecover}>
              RECOVER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileEntry;
