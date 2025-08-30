




// import React, { useState, useContext ,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../css/MobileEntry.css';
// import kkko from '../assets/icons/phone_avatar.png';
// import { AppContext } from '../context/AppContext'; // 1. Re-import the context
// import { toast } from 'react-toastify';
// const MobileEntry = () => {
//   const [phone, setPhone] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   // 2. Get the setMobileNo function from the context
//   const { setMobileNo } = useContext(AppContext);



//   const handleNext = async () => {
//     if (phone.length !== 10) {
//      // alert('Please enter a valid 10-digit phone number.');
//        toast.warn('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       const res = await axios.post('https://admin.gama567.club/api/v1/check-mobile', { mobileNo: phone },
//         {
//           headers: {
           
//             "Content-Type": "application/json",
//           },
//         });
//          console.log(res);
//       // 3. Store the mobile number in the context in ALL cases
//       setMobileNo(phone); 

//       if (res.data.status === true) {
//         // User exists, show the recovery modal
//         setShowModal(true);
//       } else {
//         // User does not exist, navigate to create account
//         // The mobile number is now available in the context for the next screens
//         navigate('/create-account',{ replace: true });
//       }
//     } catch (error) {
//      // alert('Something went wrong. Please try again.');
//        toast.error('An error occurred. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleRecover = () => {
//     // The mobile number is already in the context, so we can just navigate
//     navigate('/set-new-pin');
//   };

//   return (
//     <div className="mobile-entry-wrapper">
//       <div className="mobile-entry-container">
//         <div className="mobile-entry-heading">
//           <span className="accent-bar" />
//           <h2>
//             ENTER YOUR <br />
//             <strong>MOBILE NUMBER</strong>
//           </h2>
//         </div>

//         <img src={kkko} alt="Illustration" className="mobile-entry-image" />

//         <div className="mobile-input-container">
//           <span className="mobile-icon">🏦</span>
//           <input
//             type="tel"
//             className="mobile-input"
//             placeholder="Enter Mobile Number"
//             value={phone}
//             onChange={(e) =>
//               setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
//             }
//           />
//         </div>

//         <button className="mobile-next-button" onClick={handleNext}>
//           NEXT
//         </button>
//       </div>

//       {/* Recovery Modal */}
//       {showModal && (
//         <div className="mobile-recover-modal">
//           <div className="modal-content">
//             <h3>Account Recovery</h3>
//             <p>Recover your existing account by providing generated OTP</p>
//             <p>Do you want to continue?</p>
//             <button className="recover-button" onClick={handleRecover}>
//               RECOVER
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileEntry;






import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MobileEntry.css';
import kkko from '../assets/icons/app.png';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import AuthHeader from '../components/AuthHeader';

const MobileEntry = () => {
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setMobileNo } = useContext(AppContext);

  const handleNext = async () => {
    if (phone.length !== 10) {
      toast.warn('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const res = await axios.post(
        'https://admin.gama567.club/api/v1/check-mobile',
        { mobileNo: phone },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // keep mobile across screens
      setMobileNo(phone);

      if (res?.data?.status === true) {
        setShowModal(true); // user exists -> recover flow
      } else {
        navigate('/create-account', { replace: true }); // new user
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleRecover = () => {
    navigate('/set-new-pin');
  };

  return (
    <div className="mainhome-screen-wrapper">
      {/* Orange header */}
      {/* <header className="ms-hero">
        <h1 className="ms-hero-title">Enter Your Mobile Number</h1>

        
        <div className="ms-watermark">
          <div className="ms-card" />
          <div className="ms-card ms-card--top" />
        </div>
      </header> */}
       <AuthHeader title="Enter Your Mobile Number" />

      {/* White rounded panel */}
      {/* <main className="ms-panel"> */}
        {/* Big phone image */}
        <div className='hul'>
        <div className="ms-phoneGlyph">
          <img src={kkko} alt="Phone" className="ms-phoneImg" />
        </div>

        {/* Input + label + underline */}
        <div className="ms-inputRow">
          <div className="ms-inputIcon" aria-hidden="true">
            {/* tiny phone icon */}
            <svg width="38" height="38" viewBox="0 0 24 24">
              <rect x="6" y="3" width="12" height="18" rx="2" fill="none" stroke="#666" strokeWidth="1.6"/>
              <rect x="9" y="5.5" width="6" height="1.6" rx="0.8" fill="#666"/>
              <rect x="9" y="17.6" width="6" height="2.2" rx="1.1" fill="#666"/>
            </svg>
          </div>

          {/* <label htmlFor="mobile" className="ms-label">Enter Mobile Number</label> */}

          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            className="ms-input"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
            maxLength={10}
            autoFocus
          />

          <span className="ms-underline" />
        </div>

        {/* CTA */}
        <button className="ms-btn " type="button" onClick={handleNext}>
          Next
        </button>
      {/* </main> */}
      </div>

      {/* Recovery Modal */}
      {showModal && (
        <div className="mobile-recover-modal">
          <div className="modal-content">
            <h3>Account Recovery</h3>
            <p>Recover your existing account by providing generated OTP.</p>
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

