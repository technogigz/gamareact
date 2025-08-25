// import { useNavigate } from "react-router-dom";
// import "../css/PassbookScreen.css";
// import "../css/mainhome.css";
// import arrowDownIcon from "../assets/icons/down.png"; // Replace with actual path

// export default function PassbookScreen() {
//   const navigate = useNavigate();

//   return (
//     <div className="mainhome-screen-wrapper">
//       {/* ─── Custom Top Header ─── */}
//       <div className="passbook-header">
//         <button className="back-btn" onClick={() => navigate(-1)}>&larr;</button>
//         <h1>Passbook</h1>
//       </div>

//       {/* ─── Table ─── */}
//       <div className="table-scroll">
//         <table className="passbook-table">
//           <thead>
//             <tr>
//               <th className="narrow-col">Transaction Date</th>
//               <th className="wide-col">Particulars</th>
//               <th className="wide-col">Previous Amount</th>
//               <th className="narrow-col">Transaction Amount</th>
//               <th className="narrow-col">Current Amount</th>
//               <th className="narrow-col">Remarks</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {[1, 2, 3].map((i) => (
//               <tr key={i}>
//                 <td>28/06/2025<br />04:38:51 PM</td>
//                 <td>
//                   <div className="particulars-cell">
//                     User Welcome Bonus
//                     <img src={arrowDownIcon} alt="expand" className="down-arrow" />
//                   </div>
//                 </td>
//                 <td>₹0</td>
//                 <td>₹50</td>
//                 <td>₹50</td>
//                 <td>Welcome</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ─── Pager ─── */}
//       <div className="pager">
//         <button className="pager-btn">PREVIOUS</button>
//         <span className="pager-count">(1/0)</span>
//         <button className="pager-btn">NEXT</button>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PassbookScreen.css";
import "../css/mainhome.css";
import arrowDownIcon from "../assets/icons/down.png";

export default function PassbookScreen() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPassbook(page);
  }, [page]);

  const fetchPassbook = async (pageIndex) => {
    const token = localStorage.getItem("accessToken");
    const registerId = localStorage.getItem("registerId");

    if (!token || !registerId) {
      console.error("Missing token or registerId in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        "https://sarra777.net/api/v1/passbook-history", // Replace with actual endpoint
        {
          registerId: registerId,
          pageIndex: pageIndex,
          recordLimit: 10,
        },
        {
          headers: {
            deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;

      if (data.status && data.info) {
        setEntries(data.info.list || []);
        setTotalPages(data.info.totalPages || 1);
      } else {
        setEntries([]);
      }
    } catch (err) {
      console.error("Error fetching passbook:", err);
    }
  };

  return (
    <div className="mainhome-screen-wrapper">
      {/* Header */}
      <div className="passbook-header">
        <button className="back-btn" onClick={() => navigate(-1)}>&larr;</button>
        <h1>Passbook</h1>
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table className="passbook-table">
          <thead>
            <tr>
              <th className="narrow-col">Transaction Date</th>
              <th className="wide-col">Particulars</th>
              <th className="wide-col">Previous Amount</th>
              <th className="narrow-col">Transaction Amount</th>
              <th className="narrow-col">Current Amount</th>
              <th className="narrow-col">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              entries.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}<br />{item.time}</td>
                  <td>
                    <div className="particulars-cell">
                      {item.description}
                      <img src={arrowDownIcon} alt="expand" className="down-arrow" />
                    </div>
                  </td>
                  <td>₹{item.previousAmount}</td>
                  <td style={{ color: item.transactionAmount.startsWith("-") ? "#d10000" : "#28a745" }}>
                    ₹{item.transactionAmount}
                  </td>
                  <td>₹{item.currentAmount}</td>
                  <td>{item.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pager">
        <button
          className="pager-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          PREVIOUS
        </button>
        <span className="pager-count">({page}/{totalPages})</span>
        <button
          className="pager-btn"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
