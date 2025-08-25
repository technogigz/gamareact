

import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Notifications.css";
// import { AppContext } from "../context/AppContext";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  //const { mobileNo } = useContext(AppContext); // ✅ get mobile from context
  const mobileNo=localStorage.getItem("mobileNo");
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("accessToken");
      const mobileNo=localStorage.getItem("mobileNo");
      try {
        const response = await axios.get(
          "https://sarra777.net/api/v1/notice-history",
          {
            mobileNo: mobileNo, // ✅ dynamic mobile number
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
        console.log(response);
        if (response.data.status && Array.isArray(response.data.info)) {
          setNotifications(response.data.info);
        }
      } catch (err) {
        console.error("Notification API error:", err);
      }
    };

    if (mobileNo) {
      fetchNotifications();
    }
  }, [mobileNo]); // ✅ only rerun when mobileNo changes

  return (
    <div className="mainhome-screen-wrapper">
    {/* <div className="notification-screen-wrapper"> */}
      <div className="nnotification-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <h2>Notifications</h2>
      </div>

      <div className="nnotification-list">
        {notifications.map((item, index) => (
          <div className="nnotification-card" key={index}>
            <h4 className="nnotification-title">{item.title}</h4>
            <p className="nnotification-message">
              {item.msg.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    {/* </div> */}
    </div>
  );
}
