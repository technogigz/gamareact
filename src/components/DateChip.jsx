import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./DateChip.css";

export default function DateChip({ value, onClick }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!value) {
      // format today's date as DD/MM/YYYY
      const today = new Date();
      const formatted = today
        .toLocaleDateString("en-GB") // gives "31/08/2025" style
        .replace(/\//g, "/");
      setDate(formatted);
    } else {
      setDate(value);
    }
  }, [value]);

  return (
    <button className="date-chip" onClick={onClick}>
      <span>{date}</span>
      <FaRegCalendarAlt className="calendar-icon" />
    </button>
  );
}
