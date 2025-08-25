// src/pages/Videos.jsx

import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "../css/VideoScreen.css";
import "../css/mainhome.css"

export default function Videos() {
  const navigate = useNavigate();

  return (
    <div className="mainhome-screen-wrapper">
      {/* Top bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={24} />
        </button>
        <h2 className="top-title">Video</h2>
      </div>

      {/* Placeholder video section */}
      <div className="video-wrapper">
        <iframe
          className="yt-frame"
          src="https://www.youtube.com/embed/9xwazD5SyVg"
          title="Sample video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
