import React, { useState, useEffect } from 'react';

const MessageBar = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2800); // Hide just before the 3s reset
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className={`message-bar ${type === 'error' ? 'error' : 'success'} ${visible ? 'visible' : ''}`}>
      {message}
    </div>
  );
};

export default MessageBar;