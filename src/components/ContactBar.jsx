
import './ContactBar.css';

export default function ContactBar({ number1, number2 }) {
  const numbers = [number1, number2].filter(Boolean);

  return (
    <div className="contact-bar">
      {numbers.map((num) => (
        <a
          key={num}
          href={`https://wa.me/${num.replace(/\s/g, '')}`}
          className="wa-item"
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon-wa" />
          {num}
        </a>
      ))}
    </div>
  );
}






// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext'; // Import your context
// import './ContactBar.css';

// export default function ContactBar() {
//   // 1. Add state to hold the contact info from the API
//   const [contactInfo, setContactInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AppContext); // Get the logged-in user's data

//   // 2. Fetch the contact details when the component mounts
//   useEffect(() => {
//     const fetchContactDetails = async () => {
//       // We need the user's mobile number to make the request
//       const mobileNo = user?.mobileNo || localStorage.getItem('mobileNo');
//       if (!mobileNo) {
//         setLoading(false);
//         return; // Can't fetch without a mobile number
//       }

//       try {
//         const token = localStorage.getItem("accessToken"); // Get the auth token
//         const response = await axios.get(
//           "https://sarra777.net/api/v1/contact-detail", // Your contact details endpoint
//           { mobileNo: mobileNo },
//           {
//              headers: {
//             deviceId: "qwert",
//             deviceName: "sm2233",
//             accessStatus: "1",
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           }
//           }
//         );
//               console.log(response);
//         if (response.data.status && response.data.info?.contactInfo) {
//           setContactInfo(response.data.info.contactInfo);
//         }
//       } catch (error) {
//         console.error("Failed to fetch contact details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContactDetails();
//   }, [user]); // Re-fetch if the user object changes

//   // 3. Update the JSX to render the data from the API
//   return (
//     <div className="contact-bar">
//       {loading ? (
//         <p>Loading contact info...</p>
//       ) : contactInfo ? (
//         <>
//           {/* WhatsApp Number */}
//           <a
//             href={`https://wa.me/${contactInfo.whatsappNo}`}
//             className="wa-item"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <span className="icon-wa" />
//             {contactInfo.whatsappNo}
//           </a>
//           {/* Mobile Number (assuming it's also a WhatsApp link) */}
//           <a
//             href={`https://wa.me/${contactInfo.mobileNo}`}
//             className="wa-item"
//             target="_blank"
//             rel="noreferrer"
//           >
//             <span className="icon-wa" />
//             {contactInfo.mobileNo}
//           </a>
//         </>
//       ) : (
//         <p>Contact information not available.</p>
//       )}
//     </div>
//   );
// }
