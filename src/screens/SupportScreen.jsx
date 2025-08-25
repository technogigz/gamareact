import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SupportScreen.css";
import "../css/mainhome.css"
import sendIcon from "../assets/icons/send.png"; // replace with your icon path

export default function SupportScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChat([...chat, message]);
    setMessage("");
  };

  return (
    <div className="mainhome-screen-wrapper">
      {/* Header */}
      <div className="support-header">
        <button className="back-btn" onClick={() => navigate(-1)}>&larr;</button>
        <h1>Chat Support</h1>
      </div>

      {/* Chat Area */}
      <div className="chat-messages">
        {chat.map((msg, i) => (
          <div key={i} className="chat-bubble sent">{msg}</div>
        ))}
      </div>

      {/* Message Input */}
      <div className="chat-input-wrapper">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
    </div>
  );
}
