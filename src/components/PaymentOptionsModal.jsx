// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import './PaymentOptionsModal.css'; // We will create this CSS file next
// import '../css/mainhome.css'
// // Import your app icons
// import googlePayIcon from '../assets/icons/google-pay-or-tez-logo-svgrepo-com.svg';
// import phonePeIcon from '../assets/icons/phonepe-icon.svg';
// import paytmIcon from '../assets/icons/paytm_icon-icons.com_62778.svg';

// const PaymentOptionsModal = ({ amount, onClose }) => {
//   const { user } = useContext(AppContext);
//   const [isLoading, setIsLoading] = useState(false);

//   const handlePayment = async (depositType) => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("accessToken");
//       const registerId = user?.registerId || localStorage.getItem("registerId");

//       if (!token || !registerId) {
//         alert("Authentication error. Please log in again.");
//         setIsLoading(false);
//         return;
//       }

//       const response = await axios.post(
//         "https://admin.gama567.club/api/v1/deposit-create-upi-fund-request",
//         {
//           registerId,
//           depositType, // e.g., "googlePay"
//           amount,
//           hashKey: "chela" // As per your example
//         },
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//             "deviceId": "qwert",
//             "deviceName": "sm2233",
//             "accessStatus": "1",
//           },
//         }
//       );
//       console.log(response);

//       if (response.data.status && response.data.info) {
//         const paymentInfo = response.data.info;
//         const transactionDetails = {
//           ...paymentInfo,
//           depositType,
//           amount,
//           registerId,
//           hashKey: "chela",
//         };
//                 localStorage.setItem('pendingTransaction', JSON.stringify(transactionDetails));

//         const { upiID, paymentHash, remark } = response.data.info;
        
//         const merchantName = "SARA777"; // Or get this dynamically if needed
          
//         // Construct the UPI deep link
//         // We use encodeURIComponent to handle spaces or special characters in the name and note.
// let upiScheme;

// switch (depositType) {
//   case 'phonePe':
//     upiScheme = 'phonepe://pay';
//     break;
//   case 'googlePay':
//     upiScheme = 'tez://upi/pay'; // Google Pay's scheme
//     break;
//   case 'paytm':
//     upiScheme = 'paytmmp://pay';
//     break;
//   default:
//     upiScheme = 'upi://pay'; // Fallback to default UPI
// }
//    //static_upi=

// //const upiLink = `${upiScheme}?pa=${upiID}&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${paymentHash}&tn=${encodeURIComponent(remark)}`;
         
//   const upiLink =`upi://pay?pa=${upiID}&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${paymentHash}&tn=${encodeURIComponent(remark)}`;        

//       console.log("Generated UPI Link:", upiLink); // For debugging
        
//         // Redirect the user to the UPI app
//         window.location.href = upiLink;
//         onClose(); // Close the modal after redirecting
//       } else {
//         alert(response.data.msg || "Failed to create payment request.");
//       }
//     } catch (error) {
//       console.error("Payment initiation failed:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // <div className='mainhome-screen-wrapper'>
//     <div className="payment-modal-overlay" onClick={onClose}>
//       <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
//         <h4>Select Payment Method</h4>
//         {isLoading ? (
//           <div className="payment-loader">Loading...</div>
//         ) : (
//           <div className="payment-options">
//             <button className="payment-option-btn" onClick={() => handlePayment('googlePay')}>
//               <img src={googlePayIcon} alt="Google Pay" />
//               <span>Google Pay</span>
//             </button>
//             <button className="payment-option-btn" onClick={() => handlePayment('phonePe')}>
//               <img src={phonePeIcon} alt="PhonePe" />
//               <span>PhonePe</span>
//             </button>
//             <button className="payment-option-btn" onClick={() => handlePayment('paytm')}>
//               <img src={paytmIcon} alt="Paytm" />
//               <span>Paytm</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default PaymentOptionsModal;






import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import './PaymentOptionsModal.css';
import '../css/mainhome.css';

import googlePayIcon from '../assets/icons/google-pay-or-tez-logo-svgrepo-com.svg';
import phonePeIcon from '../assets/icons/phonepe-icon.svg';
import paytmIcon from '../assets/icons/paytm_icon-icons.com_62778.svg';

// ---- Helpers ----
const PKG = {
  googlePay: 'com.google.android.apps.nbu.paisa.user',
  phonePe:   'com.phonepe.app',
  paytm:     'net.one97.paytm',
};

const isAndroid = () => /Android/i.test(navigator.userAgent);

const buildUpiQS = ({ pa, pn, am, tr, tn }) =>
  new URLSearchParams({
    pa: pa || '',
    pn: pn || '',
    am: (Number(am) || 0).toFixed(2),
    tr: tr || '',
    tn: tn || '',
    cu: 'INR',
  }).toString();

const openAndroidIntent = (pkg, qs) => {
  const intentUrl = `intent://upi/pay?${qs}#Intent;scheme=upi;package=${pkg};end`;
  try { window.location.replace(intentUrl); } catch {}
};

const openGenericUpi = (qs) => {
  const url = `upi://pay?${qs}`;
  try { window.location.replace(url); } catch {}
};

const PaymentOptionsModal = ({ amount, onClose }) => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (depositType) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const registerId = user?.registerId || localStorage.getItem('registerId');
      if (!token || !registerId) throw new Error('Authentication error. Please log in again.');

      // 1) Create payment session
      const { data } = await axios.post(
        'https://admin.gama567.club/api/v1/deposit-create-upi-fund-request',
        { registerId, depositType, amount: Number(amount), hashKey: 'chela' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            deviceId: 'qwert',
            deviceName: 'sm2233',
            accessStatus: '1',
          },
        }
      );

      if (!data?.status || !data?.info) {
        throw new Error(data?.msg || 'Failed to create payment request.');
      }

      const { upiID, paymentHash, remark, timestamp } = data.info;
      const merchantName = 'SARA777';

      // Persist for verify step (DO NOT clear now). Stamp createdAt.
      localStorage.setItem('pendingTransaction', JSON.stringify({
        registerId,
        depositType,
        amount: Number(amount),
        hashKey: 'chela',
        timestamp,
        paymentHash,
        remark,
        createdAt: Date.now()
      }));

      // 2) Open UPI
      const qs = buildUpiQS({
        pa: upiID,
        pn: merchantName,
        am: amount,
        tr: paymentHash,
        tn: String(remark ?? ''),
      });

      const upiUrl = `upi://pay?${qs}`;
    window.location.href = upiUrl;

      onClose();
    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="payment-modal-overlay"
      onClick={!isLoading ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Select Payment Method</h4>

        {isLoading ? (
          <div className="payment-loader">Loading...</div>
        ) : (
          <div className="payment-options">
            <button
              className="payment-option-btn"
              disabled={isLoading}
              onClick={() => handlePayment('googlePay')}
            >
              <img src={googlePayIcon} alt="Google Pay" />
              <span>Google Pay</span>
            </button>

            <button
              className="payment-option-btn"
              disabled={isLoading}
              onClick={() => handlePayment('phonePe')}
            >
              <img src={phonePeIcon} alt="PhonePe" />
              <span>PhonePe</span>
            </button>

            <button
              className="payment-option-btn"
              disabled={isLoading}
              onClick={() => handlePayment('paytm')}
            >
              <img src={paytmIcon} alt="Paytm" />
              <span>Paytm</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptionsModal;
