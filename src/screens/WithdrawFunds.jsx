// src/screens/WithdrawFundsScreen.jsx
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import walletSvg   from "../assets/icons/walletCard.png";
import mcLogo      from "../assets/icons/mastercard-svgrepo-com.svg";
import gpayLogo    from "../assets/icons/google-pay-or-tez-logo-svgrepo-com.svg";
import phonepeLogo from "../assets/icons/phonepe-icon.svg";
import paytmLogo   from "../assets/icons/paytm_icon-icons.com_62778.svg";
import bankLogo    from "../assets/icons/banking.png";
import "../css/mainhome.css"
import "../css/WithdrawFunds.css";
import { toast } from "react-toastify";
const payoutOptions = [
  { id: "gpay",    label: "Google Pay",   logo: gpayLogo },
  { id: "phonepe", label: "PhonePe",      logo: phonepeLogo },
  { id: "paytm",   label: "Paytm",        logo: paytmLogo },
  { id: "bank",    label: "Bank Account", logo: bankLogo },
];
const upiPlaceholder = {
  gpay:   "Enter GPay Number",
  phonepe:"Enter PhonePe Number",
  paytm:  "Enter Paytm Number",
};

export default function WithdrawFundsScreen() {
  const walletBalance=localStorage.getItem('walletBalance');
  const nav = useNavigate();
  const [method, setMethod] = useState("gpay");
  const [isLoading, setIsLoading] = useState(false);
  const [minWithdraw, setMinWithdraw] = useState(0);
  const [form, setForm] = useState({
    amount: "",
    paytmNo: "",
    bankName: "",
    accHolder: "",
    accNo: "",
    ifsc: "",
  });

   useEffect(() => {
    const feeSettings = localStorage.getItem("feesettings");
    if (feeSettings) {
      try {
        const parsed = JSON.parse(feeSettings);
        if (parsed.minWithdraw) {
          setMinWithdraw(Number(parsed.minWithdraw));
        }
      } catch (err) {
        console.error("Error parsing feesettings:", err);
      }
    }
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
     if (Number(form.amount) < minWithdraw) {
      toast.error(`Minimum withdrawal is ₹${minWithdraw}`);
      return;
    }
  setIsLoading(true); // Start loading

  // --- Get required data from localStorage ---
  // IMPORTANT: Make sure these keys exist in your localStorage
  const registerId = localStorage.getItem("registerId");
  const token = localStorage.getItem("accessToken");
  

  // --- Prepare the request payload ---
  let payload = {
    registerId,
    amount: Number(form.amount), // Convert amount to a number
  };

  if (method === "bank") {
    // Bank payload
    payload.withdrawType = "bank";
    payload.bankName = form.bankName;
    payload.accountHolderName = form.accHolder; // Assumed API key name
    payload.accountNumber = form.accNo;       // Assumed API key name
    payload.ifscCode = form.ifsc;             // Assumed API key name
  } else {
    // UPI payload (Google Pay, PhonePe, Paytm)
    // Map your component state ('gpay') to the API's required value ('googlePay')
    const typeMapping = {
      gpay: "googlePay",
      phonepe: "phonePe",
      paytm: "paytm",
    };
    payload.withdrawType = typeMapping[method];
    payload.upiId = form.paytmNo;
  }

  try {
    const response = await axios.post(
      "https://admin.gama567.club/api/v1/withdraw-fund-request", // Using your actual base URL
      payload,
      {
        headers: {
           "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "deviceId": "qwert",
      "deviceName": "sm2233",
      "accessStatus": "1"
        }
      }
    );

    // Show success or failure message from the API
   // alert(response.data.msg);
      toast.warn(response.data.msg);
    if (response.data.status) {
      nav(-1); // Go back to the previous screen on success
    }
  } catch (error) {
    console.error("Withdrawal request failed:", error);
    alert("An error occurred. Please try again.");
  } finally {
    setIsLoading(false); // Stop loading
  }
};

  return (
    <div className="mainhome-screen-wrapper">
    <div className="withdraw-page">
      {/* ─── Top bar ─── */}
      <header className="withdraw-header">
        <button className="back-btn" onClick={() => nav(-1)}>‹</button>
        <h2>Withdraw Funds</h2>
      </header>

      {/* ─── Scrollable body ─── */}
      <div className="withdraw-body">

        {/* Wallet card */}
        <section className="wallet-card">
          <div className="card-toop">SARA777</div>
          <div className="card-body">
            <img src={walletSvg} alt="" className="card-wallet-icon" />
            <div>
              <div className="card-balance-label">{walletBalance}</div>
              <div className="card-balance-text">Current Balance</div>
            </div>
            <img src={mcLogo} alt="" className="card-mc" />
          </div>
        </section>

        {/* Payout options */}
        <div className="payout-list">
          {payoutOptions.map((opt) => (
            <label
              key={opt.id}
              className={`payout-item ${method === opt.id ? "active" : ""}`}
            >
              <div className="payout-info">
                <img src={opt.logo} alt="" className="payout-logo" />
                <div>
                  <div className="payout-label">{opt.label}</div>
                  <div className="payout-note">Manual approve by Admin</div>
                </div>
              </div>

              <input
                type="radio"
                name="payout"
                value={opt.id}
                checked={method === opt.id}
                onChange={() => setMethod(opt.id)}
              />
              <span className="custom-radio" />
            </label>
          ))}
        </div>

        {/* Dynamic form */}
        <form
          className="withdraw-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            name="amount"
            type="number"
            placeholder={`Enter Amount (Min ₹${minWithdraw})`}
            value={form.amount}
            onChange={onChange}
            required
          />

          {method !== "bank" && (
            <input
    name="paytmNo"
    placeholder={upiPlaceholder[method]}
    value={form.paytmNo}
    onChange={onChange}
    required
  />
          )}

          {method === "bank" && (
            <>
              <input
                name="bankName"
                placeholder="Bank Name"
                value={form.bankName}
                onChange={onChange}
                required
              />
              <input
                name="accHolder"
                placeholder="Account Holder Name"
                value={form.accHolder}
                onChange={onChange}
                required
              />
              <input
                name="accNo"
                placeholder="Account Number"
                value={form.accNo}
                onChange={onChange}
                required
              />
              <input
                name="ifsc"
                placeholder="IFSC Code"
                value={form.ifsc}
                onChange={onChange}
                required
              />
            </>
          )}

          <button type="submit" disabled={isLoading}>
  {isLoading ? "SUBMITTING..." : "SUBMIT"}
</button>
        </form>

        {/* Help box */}
        <div className="help-box">
          For withdraw related queries call<br />or&nbsp;WhatsApp<br />
          <strong>Monday&nbsp;to&nbsp;Sunday • 9:00 AM – 6:00 PM</strong>
        </div>
      </div>
    </div>
    </div>
  );
}





// import React, { useState,useEffect } from 'react';
// import '../css/WithdrawScreen.css';

// // Import icons from the library
// import { FaWallet, FaWhatsapp } from 'react-icons/fa';
// import { BsBank2 } from 'react-icons/bs';

// // Assuming you have these components already
// import Header from '../components/Header'; 
// import BottomNav from '../components/BottomNav';

// const WithdrawScreen = () => {
//   const walletBalance=localStorage.getItem('walletBalance');
//   const [amount, setAmount] = useState('');
//   const [minWithdrawAmount, setMinWithdrawAmount] = useState(0);

//   useEffect(() => {
//     try {
//       const settingsString = localStorage.getItem('feeSettings');
//       if (settingsString) {
//         const settings = JSON.parse(settingsString);
//         // Set the value from the parsed object, default to 0 if not found
//         setMinWithdrawAmount(settings.minWithdraw || 0);
//       }
//     } catch (error) {
//       console.error("Failed to parse feeSettings from localStorage", error);
//     }
//   }, []);

//   return (
//     <div className='mainhome-screen-wrapper'>
//     <div className="withdraw-screen-wrapper">
//       <Header />
//       <main className="withdraw-content">
        
//         {/* Current Balance Card */}
//         <div className="balance-card">
//           <div className="balance-left">
//             <div className="wallet-icon-container">
//               <FaWallet className="wallet-icon" />
//             </div>
//             <div className="balance-text">
//               <span className="balance-amount">{walletBalance}</span>
//               <span className="balance-label">Current Balance</span>
//             </div>
//           </div>
//           <div className="card-logo">
//             <div className="circle-1"></div>
//             <div className="circle-2"></div>
//           </div>
//         </div>

//         {/* WhatsApp Info Card */}
//         <div className="info-card">
//           <h4>Call or Whatsapp for Withdraw Related Queries</h4>
//           <div className="info-contact">
//             <FaWhatsapp className="whatsapp-icon" />
//             <div className="contact-details">
//               <p className="phone-number">+919649115777</p>
//               <p className="timing">09:00 AM ~ 10:00 PM</p>
//             </div>
//           </div>
//         </div>

//         {/* Withdraw Form Section */}
//         <div className="withdraw-form">
//           <h3 className="withdraw-title">Withdraw Fund</h3>
//           <div className="input-group">
//             <BsBank2 className="input-iconn" />
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter Amount"
//               className="amount-input"
//             />
//           </div>
//           {minWithdrawAmount > 0 && (
//               <p className="min-withdraw-text">
//                Minimum withdraw: ₹{minWithdrawAmount}
//                  </p>
//                    )}
//           <button className="send-request-btn">
//             SEND REQUEST
//           </button>
//         </div>

//       </main>
//       <BottomNav />
//     </div>
//     </div>
//   );
// };

// export default WithdrawScreen;