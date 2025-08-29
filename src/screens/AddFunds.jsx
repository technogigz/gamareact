







// import React, { useContext, useState , useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import '../css/mainhome.css';
// import '../css/AddFunds.css';

// import Header from '../components/Header';
// import BottomNav from '../components/BottomNav';
// import Sidebar from '../components/SideBar';
// import PaymentOptionsModal from '../components/PaymentOptionsModal'; // Import the new modal

// const AddFundsScreen = () => {
//   const navigate = useNavigate();
//   const { user ,refetchUser} = useContext(AppContext);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [amount, setAmount] = useState('');
//   // State to control the visibility of the payment modal
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//    const [paymentStatus, setPaymentStatus] = useState('idle');
//    const settings = JSON.parse(localStorage.getItem('feeSettings') || '{}');


   


//   const minDeposit = settings?.minDeposit || 500;



//   //  useEffect(() => {
//   //   const pendingTx = localStorage.getItem('pendingTransaction');
//   //   if (pendingTx) {
//   //     verifyPayment(JSON.parse(pendingTx));
//   //   }
//   // }, []);

    
//     useEffect(() => {
//   // 1. Create a function to check for the transaction
//   const checkPendingTransaction = () => {
//     const pendingTx = localStorage.getItem('pendingTransaction');
//     if (pendingTx) {
//       verifyPayment(JSON.parse(pendingTx));
//     }
//   };

//   // 2. A handler that runs when tab visibility changes
//   const handleVisibilityChange = () => {
//     if (document.visibilityState === 'visible') {
//       checkPendingTransaction();
//     }
//   };

//   // 3. Check for the transaction when the page first loads
//   checkPendingTransaction();

//   // 4. Add the event listener to check again every time the user returns to the app
//   document.addEventListener('visibilitychange', handleVisibilityChange);

//   // 5. IMPORTANT: Clean up the listener when the component is removed
//   return () => {
//     document.removeEventListener('visibilitychange', handleVisibilityChange);
//   };
// }, []);




//   const verifyPayment = async (txDetails) => {
//     setPaymentStatus('pending');
//     localStorage.removeItem('pendingTransaction'); // Clear it so we don't check again

//     try {
//       const token = localStorage.getItem("accessToken");
//       // --- STEP 4: Make the confirmation API call ---
//       const response = await axios.post(
//         "https://admin.gama567.club/api/v1/add-upi-deposit-fund-request",
//         txDetails, // Send all the saved details
//         { headers: { "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//             "deviceId": "qwert",
//             "deviceName": "sm2233",
//             "accessStatus": "1" } }
//       );
//   console.log(response);
//       if (response.data.status) {
//         setPaymentStatus('success');
//         await refetchUser(); // Refresh wallet balance
//       } else {
//         setPaymentStatus('failed');
//       }
//     } catch (error) {
//       console.error("Payment verification failed:", error);
//       setPaymentStatus('failed');
//     }
//   };





//   const handleAddFundClick = () => {
//     const numericAmount = parseInt(amount, 10);
//     if (!numericAmount || numericAmount < minDeposit) {
//       alert(`Please enter an amount of at least ₹${minDeposit}.`);
//       return;
//     }

//     console.log(`Proceeding to add ₹${numericAmount} `);
//     // Open the payment options modal instead of navigating
//     setIsPaymentModalOpen(true);
//   };


//   if (paymentStatus === 'pending' || paymentStatus === 'success' || paymentStatus === 'failed') {
//     return (
//       <div className="mainhome-screen-wrapper">
//         <div className="payment-status-overlay">
//           {paymentStatus === 'pending' && <h2>Verifying Payment...</h2>}
//           {paymentStatus === 'success' && <h2>Payment Successful!</h2>}
//           {paymentStatus === 'failed' && <h2>Payment Failed.</h2>}
//           <button className="funds-action-btn" onClick={() => setPaymentStatus('idle')}>
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mainhome-screen-wrapper">
//       <Header onMenuClick={() => setIsSidebarOpen(true)} />
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
//       <div className="funds-container">
//         <div className="funds-content-top">
//           <div className="funds-balance-card">
//             <div className="funds-card-top">
//               <span className="funds-card-brand">SARA777</span>
//               <div className="funds-card-logo"></div>
//             </div>
//             <div className="funds-card-bottom">
//               <div className="funds-wallet-icon"></div>
//               <div>
//                 <span className="funds-balance-amount">₹{user?.walletBalance || 0}</span>
//                 <span className="funds-balance-label">Current Balance</span>
//               </div>
//             </div>
//           </div>
          

//           {/* Add Fund Input Field */}
//           <div className="funds-input-wrapper">
//             <div className="funds-bank-icon"></div>
//             <input 
//               type="tel"
//               className="funds-input"
//               placeholder={`Add Fund (Min ₹${minDeposit})`}
//               value={amount}
//               onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
//             />
//           </div>
//         </div>

//         {/* Action Buttons now trigger the modal */}
//         <div className="funds-action-buttons">
//           <button className="funds-action-btn" onClick={handleAddFundClick}>ADD POINT - UPI</button>
//           <button className="funds-action-btn" onClick={handleAddFundClick}>ADD POINT - QR - PAYTM - GATEWAY</button>
//           <button className="funds-action-btn">HOW TO ADD POINT</button>
//         </div>
//       </div>
      
//       <BottomNav active="Funds" />

//       {/* Render the modal when it's open */}
//       {isPaymentModalOpen && (
//         <PaymentOptionsModal 
//           amount={parseInt(amount, 10)} 
//           onClose={() => setIsPaymentModalOpen(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default AddFundsScreen;






import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import '../css/mainhome.css';
import '../css/AddFunds.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/SideBar';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import { toast } from 'react-toastify';

const AddFundsScreen = () => {
  const { user, refetchUser } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle|pending|success|failed
   const [isLoading, setIsLoading] = useState(false);
  const presetAmounts = [500, 1000, 1500, 2000, 5000, 10000];

    const [paymentMethods, setPaymentMethods] = useState({
    upiStatus: true, // Default to true (visible)
    qrStatus: true,  // Default to true (visible)
  });


   const handlePresetAmountClick = (presetValue) => {
    // We set the amount, ensuring it's a string for the input field
    setAmount(String(presetValue));
  };


  useEffect(() => {
    // Reading the 'upiStatus' from local storage
    const feeSettings = JSON.parse(localStorage.getItem('feeSettings'));
    // Reading the 'qrStatus' from local storage
    const upiEnabled=feeSettings.upiStatus;
    const qrEnabled = feeSettings.qrStatus;
    console.log(feeSettings);
    setPaymentMethods({
      // If the value is 'false', set to false; otherwise, default to true
      upiStatus: !!upiEnabled,
          qrStatus: !!qrEnabled,
         
    });
    
  }, []); 
   console.log(paymentMethods);
   const navigate = useNavigate();

  const settings = JSON.parse(localStorage.getItem('feeSettings') || '{}');
  const minDeposit = settings?.minDeposit || 500;

  // Track if we actually left the app (tab hidden) before verifying
  const wasHiddenRef = useRef(false);

  const verifyPayment = async (txDetails) => {
    setPaymentStatus('pending');
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Missing token');

      const res = await axios.post(
        'https://admin.gama567.club/api/v1/add-upi-deposit-fund-request',
        txDetails,
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

      if (res?.data?.status) {
        setPaymentStatus('success');
        await refetchUser?.();
        localStorage.removeItem('pendingTransaction'); // clear only on success
      } else {
        setPaymentStatus('failed');
      }
    } catch (e) {
      console.error('Payment verification failed:', e);
      setPaymentStatus('failed');
    }
  };

  // Verify ONLY after we return from UPI (hidden -> visible/focus/pageshow)
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        wasHiddenRef.current = true;
      } else if (document.visibilityState === 'visible') {
        if (wasHiddenRef.current) {
          const pending = localStorage.getItem('pendingTransaction');
          if (pending) {
            try {
              const tx = JSON.parse(pending);
              if (!tx.createdAt || Date.now() - tx.createdAt > 1200) {
                verifyPayment(tx);
              }
            } catch {}
          }
          wasHiddenRef.current = false;
        }
      }
    };

    const onFocusLikeReturn = () => {
      if (wasHiddenRef.current) {
        const pending = localStorage.getItem('pendingTransaction');
        if (pending) {
          try {
            const tx = JSON.parse(pending);
            if (!tx.createdAt || Date.now() - tx.createdAt > 1200) {
              verifyPayment(tx);
            }
          } catch {}
        }
        wasHiddenRef.current = false;
      }
    };

    // Do NOT verify on mount; wait for a real return from UPI
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocusLikeReturn);
    window.addEventListener('pageshow', onFocusLikeReturn); // PWA-friendly

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocusLikeReturn);
      window.removeEventListener('pageshow', onFocusLikeReturn);
    };
  }, []); // important: no immediate verify on first load

  const handleAddFundClick = () => {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < minDeposit) {
     // alert(`Please enter an amount of at least ₹${minDeposit}.`);
     toast.error(`Please enter an amount of at least ₹${minDeposit}.`);
      return;
    }
    setIsPaymentModalOpen(true);
  };

   const handleAddFundQRClick = async () => {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount < minDeposit) {
     // alert(`Please enter an amount of at least ₹${minDeposit}.`);
     toast.error(`Please enter an amount of at least ₹${minDeposit}.`);
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const registerId = localStorage.getItem('registerId');
      const requestBody = {
        mobile: user?.mobileNo,
        registerId,
        amount: numericAmount,
      };
      console.log(requestBody);

      const res = await axios.post(
        'https://admin.gama567.club/api/v1/create-transaction-link', // <-- Make sure to use your actual endpoint
        requestBody,
        { headers: {  Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            deviceId: 'qwert',
            deviceName: 'sm2233',
            accessStatus: '1',} }
      );
      console.log(res);

      if (res?.data?.status && res.data.payment_link) {
        // Open the payment link in a new tab
        window.open(res.data.payment_link, '_blank');
        // Immediately navigate to the passbook page
      // <-- 4. Redirect the user
      //navigate('/passbook');
      } else {
       // alert(res?.data?.msg || 'Failed to create payment link.');
        toast.warn(res?.data?.msg || 'Failed to create payment link.');
      }
    } catch (e) {
      console.error('Failed to create payment link:', e);
     // alert('An error occurred. Please try again.');
       toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  if (paymentStatus !== 'idle') {
    return (
      <div className="mainhome-screen-wrapper">
        <div className="payment-status-overlay">
          {paymentStatus === 'pending' && <h2>Verifying Payment...</h2>}
          {paymentStatus === 'success' && <h2>Payment Successful!</h2>}
          {paymentStatus === 'failed' && <h2>Payment Failed.</h2>}
          <button className="funds-action-btn" onClick={() => setPaymentStatus('idle')}>
            Close
          </button>
        </div>
      </div>
    );
  }

   if (isLoading) {
    return (
      <div className="mainhome-screen-wrapper">
        <div className="payment-status-overlay">
          <h2>Generating Payment Link...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mainhome-screen-wrapper">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="funds-container">
        <div className="funds-content-top">
          <div className="funds-balance-card">
            <div className="funds-card-top">
              <span className="funds-card-brand">SARA777</span>
              <div className="funds-card-logo"></div>
            </div>
            <div className="funds-card-bottom">
              <div className="funds-wallet-icon"></div>
              <div>
                <span className="funds-balance-amount">₹{user?.walletBalance || 0}</span>
                <span className="funds-balance-label">Current Balance</span>
              </div>
            </div>
          </div>

          {/* Amount input */}
          <div className="funds-input-wrapper">
            <div className="funds-bank-icon"></div>
            <input
              inputMode="decimal"
              pattern="[0-9]*"
              className="funds-input"
              placeholder={`Add Fund (Min ₹${minDeposit})`}
              value={amount}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9.]/g, '');
                const safe = v.replace(/^(\d*\.?\d{0,2}).*$/, '$1');
                setAmount(safe);
              }}
            />
          </div>
          <div className="funds-preset-buttons">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              className="funds-preset-btn"
              onClick={() => handlePresetAmountClick(preset)}
            >
              ₹{preset.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
        </div>
        

        <div className="funds-action-buttons">
            {paymentMethods.upiStatus && (
          <button className="funds-action-btn" onClick={handleAddFundClick}>
            ADD POINTS - UPI
          </button>
        )}
           {paymentMethods.qrStatus && (
          <button className="funds-action-btn" onClick={handleAddFundQRClick}>
            ADD POINTS - QR
          </button>
        )}
          {/* <button className="funds-action-btn">HOW TO ADD POINT</button> */}
        </div>
      </div>

      <BottomNav active="Funds" />

      {isPaymentModalOpen && (
        <PaymentOptionsModal
          amount={Number(amount)}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AddFundsScreen;
