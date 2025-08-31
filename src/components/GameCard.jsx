// import "./GameCard.css";

// export default function GameCard({ title, number, openTime, closeTime, closed }) {
//   return (
//     <div className="game-card">
//       <div className="card-left">
//         <div className="card-top">
//           <h3>{title}</h3>
//           <span className={`status ${closed ? "closed" : "open"}`}>
//             {closed ? "Closed for Today" : "Open"}
//           </span>
//         </div>
//         <div className="hihih">
//            <p className="number">{number}</p>

//          <div className="times">
//           <div className="time-block">
//             <span>Open Bid</span>
//             <span>{openTime}</span>
//           </div>
//           <div className="time-block">
//             <span>Close Bid</span>
//             <span>{closeTime}</span>
//           </div>
//          </div>
//         </div>
//       </div>

//       <button className="play-btn">
//         <span className="icon-play" />
//         <span>Play Game</span>
//       </button>
//     </div>
//   );
// }



// import "./GameCard.css";

// export default function GameCard({ title, number, openTime, closeTime, closed,isAccountActive , statusText}) {
//   return (
//     <div className={`game-card ${!isAccountActive ? 'disabled' : ''}`}>
//   <div className="card-left">
//     <div className="card-header">
//       <h3 className="game-title">{title}</h3>
//     </div>

//     <p className="number">{number}</p>

//     <div className="times">
//       <div className="time-block">
//         <span>Open Bid</span>
//         <span>{openTime}</span>
//       </div>
//       <div className="time-block">
//         <span>Close Bid</span>
//         <span>{closeTime}</span>
//       </div>
//     </div>
//   </div>

//   <div className="card-right">
//     <span className={`status ${closed ? "closed" : "open"}`}>
//       {statusText}
//     </span>
//     {isAccountActive && (
//   <button className="play-btn">
//     <span className="icon-play" />
//     <span>Play Game</span>
//   </button>
// )}
//   </div>
// </div>

//   );
// }



import "./GameCard.css";
import clock from "../assets/icons/iconwhite.png";
import playIcon from "../assets/icons/play.png";

// You will need to import your icons. 
// For example, if you have them as SVG files in an assets folder:
// import clockIcon from '../assets/icons/clock.svg';
// import playIcon from '../assets/icons/play.svg';

export default function GameCard({ title, number,closed ,isAccountActive, statusText }) {
  // In the new design, the status text like "Betting is Running for Today"
  // seems to be the main indicator, so we use that directly.
  

  return (
    <div>
   <div className={`game-card ${!isAccountActive ? 'disabled' : ''}`}>
      <div className="card-left">
        <h3 className="game-title">{title}</h3>
        <p className="game-number">{number}</p>
        <span className={`game-status ${closed ? "closed" : "open"}`}>
          {statusText}
        </span>
      </div>

      <div className="card-right">
        <div className="action-button">
          <div className="icon-container play">
            {/* The icon would be a background image set in CSS */}
            <div className="icon clock-icon">
             <img src={clock} alt="" />
            </div>
          </div>
          <span>Game time</span>
        </div>
        
        {/* The Play button is only shown if the account is active */}
        {isAccountActive && (
          <button className="action-button play-button">
            <div className="icon-container play">
               {/* The icon would be a background image set in CSS */}
               <img src={playIcon} alt="" />
            </div>
            <span>Play Game</span>
          </button>
        )}
      </div>
    </div>
    </div>
 
  );
}