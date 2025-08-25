// import React from 'react';

// const Numpad = ({ bids, onNumberClick }) => {
//   const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

//   return (
//     <div className="numpad-grid">
//       {numbers.map((num) => (
//         <button key={num} className="numpad-btn" onClick={() => onNumberClick(num)}>
//           {bids[num] && <span className="numpad-badge">{bids[num]}</span>}
//           {num}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Numpad;



import React from 'react';

const Numpad = ({ onNumberClick, bids = {},  isLoading }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="numpad-grid">
      {numbers.map((num) => {
        const hasBid = !!bids[num];
       // const isFetched = fetchedDigits.includes(num); // Check if the digit was fetched
        return (
          <button
            key={num}
            className="numpad-btn"
            onClick={() => onNumberClick(num)}
            disabled={isLoading}
          >
             {hasBid && <span className="numpad-badge">{bids[num]?.points}</span>}
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default Numpad;