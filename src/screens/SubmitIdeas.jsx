import React, { useState } from "react";
import "../css/SubmitIdeas.css";
import "../css/mainhome.css"
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SubmitIdeaScreen() {
  const [idea, setIdea] = useState("");
  const navigate = useNavigate();

  const maxChars = 500;

  const handleSubmit = () => {
    if (!idea.trim()) return alert("Please enter your idea first.");
    alert("Idea submitted: " + idea);
    setIdea("");
  };

  return (
    <div className="mainhome-screen-wrapper">
      {/* Header */}
      <div className="idea-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={22} />
        </button>
        <h3>Your Idea</h3>
      </div>

      {/* Textarea */}
      <div className="textarea-wrapper">
        <textarea
          value={idea}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              setIdea(e.target.value);
            }
          }}
          placeholder="Write your idea here..."
        />
        <div className="char-count">{idea.length}/{maxChars}</div>
      </div>

      {/* Submit Button */}
      <button className="submit-btn" onClick={handleSubmit}>
        SUBMIT YOUR IDEA
      </button>
    </div>
  );
}
