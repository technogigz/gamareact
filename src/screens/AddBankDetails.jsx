import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoWallet from "../assets/icons/logoGama.png";
import iconUser from "../assets/icons/profile_icon1.svg";
import iconCard from "../assets/icons/ac_icon.svg";
import iconIfsc from "../assets/icons/ac_icon.svg";
import iconBank from "../assets/icons/ac_icon.svg";
import "../css/AddBankDetails.css";
import "../css/mainhome.css";
import { toast } from "react-toastify";
import AppHeader from "../components/AppHeader";
export default function AddBankDetailsScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    holder: "",
    accNo: "",
    ifsc: "",
    bank: ""
  });
const walletBalance=localStorage.getItem("walletBalance");
  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const registerId = localStorage.getItem("registerId");
    const token = localStorage.getItem("accessToken");
// console.log(token," ****** ");
// console.log(registerId)
    const payload = {
      registerId,
      accountHolderName: form.holder,
      accountNumber: form.accNo,
      bankName: form.bank,
      ifscCode: form.ifsc,
    };

    try {
      const res = await axios.post(
        "https://admin.gama567.club/api/v1/update-bank-details", // Replace with your actual API URL
        payload,
        {
          headers: {
              "deviceId": "qwert", // Replace with real device ID if available
            "deviceName": "sm2233", // Replace with actual device info
            "accessStatus": "1",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      // console.log(res);

        if (res.data.status === true) {
          //  alert("Bank details added successfully!");
            toast.success('Bank details added successfully.');
             navigate(-1);
             } else {
           alert(res.data.msg || "Failed to add bank details.");
        }
    } catch (error) {
      console.error("Error adding bank details:", error);
      alert("Failed to add bank details.");
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      <div className="add-bank-page">
        {/* top bar */}
        {/* <header className="add-bank-header">
          <button className="back-btn" onClick={() => nav(-1)}>‹</button>
          <h3>Add Bank Details</h3>
        </header> */}
        <AppHeader
                                              title="Add Bank Details"
                                               walletBalance={walletBalance}
                                              onBack={() => navigate(-1)}
                                              onWalletClick={() => navigate("/passbook")}
                                            />

        <div className="add-bank-body">
          {/* logo */}
          <div className="brand-circle">
            <img src={logoWallet} alt="Sara777" />
          </div>

          {/* form */}
          <form
            className="bank-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <Input
              icon={iconUser}
              name="holder"
              placeholder="Account Holder Name"
              value={form.holder}
              onChange={onChange}
            />
            <Input
              icon={iconCard}
              name="accNo"
              placeholder="Account Number"
              value={form.accNo}
              onChange={onChange}
            />
            <Input
              icon={iconIfsc}
              name="ifsc"
              placeholder="IFSC CODE"
              value={form.ifsc}
              onChange={onChange}
            />
            <Input
              icon={iconBank}
              name="bank"
              placeholder="Bank Name"
              value={form.bank}
              onChange={onChange}
            />
            {/* <Input
              icon={iconBank}
              name="branch"
              placeholder="Branch Name"
              value={form.branch}
              onChange={onChange}
            /> */}

           <button type="submit" className="save-btn">SAVE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ——— Tiny controlled input component ——— */
function Input({ icon, ...rest }) {
  return (
    <div className="input-wrap">
      <div className="input-icon">
        <img src={icon} alt="" />
      </div>
      <input {...rest} />
    </div>
  );
}
