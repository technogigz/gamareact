// import React, { useState, useMemo } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { gameConfigs } from '../config/config';

// // CSS Imports
// import '../css/mainhome.css';
// import './GamesScreen.css';

// // Child Component Imports
// import Header from './GameHeader';
// import MessageBar from './GameMessageBar';
// import BidsList from './GameBidsList';
// import BottomBar from './GameBottomBar';
// import ConfirmationModal from './GameConfirmModal';
// import StandardLayout from './StandardLayout';
// import NumpadLayout from './NumpadLayout';
// import AutoEntryLayout from './AutoEntryLayout';
// import NumpadApiLayout from './NumpadApiLayout';

// import { Single_Pana } from '../config/GameData';

// const BidGames = () => {
//   const { marketId, gameType } = useParams();
//   const config = gameConfigs[gameType];
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- STATE MANAGEMENT ---
//   const [walletBalance, setWalletBalance] = useState(33146);
//   const [selectedGameType, setSelectedGameType] = useState('Open');
//   const [digit, setDigit] = useState(''); // For Standard layout
//   const [points, setPoints] = useState(''); // For all layouts
//   const [jodiDigit, setJodiDigit] = useState(''); // NEW: For AutoEntry layout
//   const [bids, setBids] = useState(config?.uiType === 'Numpad' ? {} : []);
//   const [message, setMessage] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedDigits, setFetchedDigits] = useState([]);

//   const marketName = location.state?.marketName || `Market ${marketId}`;
//   const pageTitle = config ? `${marketName}, ${config.title}` : 'Loading...';

//    const deriveSingleDigit = (pana) => {
//     return (pana.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0) % 10).toString();
//   };

//   const handleBackClick = () => navigate(-1);

//   // --- DERIVED STATE ---
//   const { totalBids, totalPoints, bidsForList } = useMemo(() => {
//     if (config?.uiType === 'Numpad') {
//       const bidEntries = Object.entries(bids);
//       const calculatedTotalPoints = bidEntries.reduce((sum, [, p]) => sum + (parseInt(p, 10) || 0), 0);
//       const list = bidEntries.map(([d, p]) => ({ digit: d, points: p, type: selectedGameType }));
//       return { totalBids: bidEntries.length, totalPoints: calculatedTotalPoints, bidsForList: list };
//     }
//     const calculatedTotalPoints = bids.reduce((sum, bid) => sum + (parseInt(bid.points, 10) || 0), 0);
//     return { totalBids: bids.length, totalPoints: calculatedTotalPoints, bidsForList: bids };
//   }, [bids, config?.uiType, selectedGameType]);

//   // --- LOGIC & HANDLERS ---
//   const showMessage = (text, type = 'success') => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage(null), 3000);
//   };


//   const handleDigitChange = (value) => {
//     setDigit(value); // This is our Pana input state
//     if (gameType === 'singlePana' && value) {
//       const filtered = Single_Pana.filter(p => p.startsWith(value));
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };


//   const handleSuggestionClick = (suggestion) => {
//     setDigit(suggestion);
//     setSuggestions([]);
//   };
//  const handleAddBid = () => {
//   // --- SINGLE PANA VALIDATION ---
//   if (gameType === 'singlePana') {
//     // It must be a valid number from our master list
//     if (!Single_Pana.includes(digit)) {
//       return showMessage('Please enter a valid Single Pana.', 'error');
//     }
//   }
//   // --- JODI VALIDATION ---
//   else if (gameType === 'jodi') {
//     if (!digit || digit.length !== 2 || !/^\d{2}$/.test(digit)) {
//       return showMessage('Please enter a valid 2-digit Jodi (00-99).', 'error');
//     }
//     if (bids.some(bid => bid.digit === digit)) {
//       return showMessage(`Jodi ${digit} has already been added.`, 'error');
//     }
//   } 
//   // --- SINGLE DIGIT VALIDATION ---
//   else if (gameType === 'singleDigits') {
//     if (!digit || !/^[0-9]$/.test(digit)) {
//       return showMessage('Please enter a valid single digit (0-9).', 'error');
//     }
//   }

//   // --- COMMON VALIDATION ---
//   if (!points || parseInt(points, 10) < 10) {
//     return showMessage('Points must be at least 10.', 'error');
//   }

//   const newBids = [...bids];
//   const existingBidIndex = newBids.findIndex(
//     (b) => b.digit === digit && b.type === selectedGameType
//   );
  
//   // These game types will update an existing bid instead of adding a new one
//   const updateableGameTypes = ['singleDigits', 'singlePana'];

//   if (existingBidIndex > -1 && updateableGameTypes.includes(gameType)) {
//     // Update logic for Single Digit and Single Pana
//     newBids[existingBidIndex].points = 
//       (parseInt(newBids[existingBidIndex].points, 10) + parseInt(points, 10)).toString();
//     showMessage(`Updated points for ${digit}`);
//   } else {
//     // Add new bid logic for Jodi and other games
//     newBids.push({ digit, points, type: selectedGameType });
//     showMessage('Bid added successfully!');
//   }
  
//   setBids(newBids);
  
//   // --- RESET INPUTS ---
//   setDigit('');
//   setPoints('');
//   setSuggestions([]); // Clear autocomplete suggestions
// };
  
//   const handleNumpadBid = (num) => { /* Logic for Numpad layout */
//     if (!points || parseInt(points, 10) < 10) {
//       return showMessage('Please enter points (min 10).', 'error');
//     }
//     setBids(prevBids => ({ ...prevBids, [num]: points }));
//   };

//   // NEW: Logic for AutoEntry layout
//   const handleAutoEntry = (value) => {
//     setJodiDigit(value);
//     if (value.length !== 2) return;

//     if (!points || parseInt(points, 10) < 10) {
//       // Clear the jodi field so user can try again after entering points
//       setTimeout(() => setJodiDigit(''), 100);
//       return showMessage('Please enter points (min 10).', 'error');
//     }
//     if (bids.some(bid => bid.digit === value)) {
//       setTimeout(() => setJodiDigit(''), 100);
//       return showMessage(`Jodi ${value} has already been added.`, 'error');
//     }

//     setBids(prevBids => [...prevBids, { digit: value, points, type: 'Jodi' }]);
//     showMessage(`Jodi ${value} with ${points} points added.`);
    
//     setJodiDigit('');
//     setPoints('');
//   };

//    const handleRemoveBid = (key) => {
//     if (config.uiType === 'Numpad') {
//       const newBids = { ...bids };
//       delete newBids[key];
//       setBids(newBids);
//     } else {
//       setBids(bids.filter((_, index) => index !== key));
//     }
//     showMessage('Bid removed.', 'error');
//   };

//    const handleSubmitClick = () => {
//     if (totalBids === 0) return;
//     if (totalPoints > walletBalance) {
//       return showMessage('Insufficient wallet balance.', 'error');
//     }
//     setIsModalOpen(true);
//   };

//   // UPDATED: Final submission logic with conditional API endpoints
// const handleConfirmSubmit = () => {
//   const lowerMarketName = marketName.toLowerCase();
//   let apiEndpoint = '/place-bid'; // Default endpoint

//   if (lowerMarketName.includes('jackpot')) {
//     apiEndpoint = '/place-jackpot-bid';
//   } else if (lowerMarketName.includes('starline')) {
//     apiEndpoint = '/place-starline-bid';
//   }

//   // --- NEW: Prepare the final API payload ---
//   // Start with the consistently formatted list of bids
//   let finalApiPayload = bidsForList;

//   // If the game is 'singlePana', transform the payload to match the API requirements
//   if (gameType === 'singlePana') {
//     finalApiPayload = bidsForList.map(bid => ({
//       // Copy existing bid properties like points and type
//       ...bid, 
//       // Add the 'pana' field with the bid number
//       pana: bid.digit, 
//       // Overwrite the 'digit' field to be an empty string
//       digit: '',       
//     }));
//   }
//   // --- End of new logic ---

//   // The console.log now shows the final data that would be sent to the server
//   console.log(`Submitting to API: ${apiEndpoint}`, { 
//     marketId, 
//     gameType, 
//     bids: finalApiPayload, // Use the prepared payload
//     totalPoints 
//   });
  
//   const newBalance = walletBalance - totalPoints;
//   setWalletBalance(newBalance);
//   setBids(config.uiType === 'Numpad' ? {} : []);
//   setIsModalOpen(false);
//   showMessage('Bids placed successfully!');
// };

//   if (!config) {
//     return <div>Game configuration not found!</div>;
//   }

//   return (
//   <div className="mainhome-screen-wrapper">
//     <MessageBar message={message?.text} type={message?.type} />
//     <Header title={pageTitle} walletBalance={walletBalance} onBackClick={handleBackClick} />
    
//     <main className="game-content">
//       <div className="form-container">
//         {config.uiType === 'AutoEntry' ? (
//           <AutoEntryLayout
//             config={config}
//             points={points}
//             setPoints={setPoints}
//             jodiDigit={jodiDigit}
//             handleAutoEntry={handleAutoEntry}
//           />
//         ) : config.uiType === 'Numpad' ? (
//           <NumpadLayout
//             config={config}
//             points={points}
//             setPoints={setPoints}
//             handleNumpadBid={handleNumpadBid}
//             bids={bids}
//             selectedGameType={selectedGameType}
//             setSelectedGameType={setSelectedGameType}
//           />
//         ) : (
//           // This is the updated part for the Standard layout
//           <StandardLayout
//             config={config}
//             gameType={gameType} // Pass gameType
//             digit={digit}
//             handleDigitChange={handleDigitChange}
//             points={points}
//             setPoints={setPoints}
//             handleAddBid={handleAddBid}
//             selectedGameType={selectedGameType}
//             setSelectedGameType={setSelectedGameType}
//             suggestions={suggestions} // Pass suggestions
//             handleSuggestionClick={handleSuggestionClick} // Pass suggestion handler
//           />
//         )}
//       </div>
      
//       <BidsList bids={bidsForList} onRemove={handleRemoveBid} />
//     </main>
    
//     <BottomBar 
//       totalBids={totalBids} 
//       totalPoints={totalPoints} 
//       onSubmit={handleSubmitClick} 
//     />
//     <ConfirmationModal 
//       isOpen={isModalOpen}
//       onClose={() => setIsModalOpen(false)}
//       onConfirm={handleConfirmSubmit}
//       gameName={pageTitle}
//       bids={bidsForList}
//       totalBids={totalBids}
//       totalPoints={totalPoints}
//       walletBalance={walletBalance}
//     />
//   </div>
// );
// };

// export default BidGames;




import React, { useState, useMemo,useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { gameConfigs } from '../config/config';
import { Single_Pana , All_Jodis ,Double_Pana,Triple_Pana,All_Digits } from '../config/GameData';
import { AppContext } from '../context/AppContext';
// CSS Imports
import '../css/mainhome.css';
import './GamesScreen.css';

// Child Component Imports
import Header from './GameHeader';
import MessageBar from './GameMessageBar';
import BidsList from './GameBidsList';
import BottomBar from './GameBottomBar';
import ConfirmationModal from './GameConfirmModal';
import StandardLayout from './StandardLayout';
import NumpadLayout from './NumpadLayout';
import AutoEntryLayout from './AutoEntryLayout';
import NumpadApiLayout from './NumpadApiLayout';
import GeneratorLayout from './GeneratorLayout';
import ManualGeneratorLayout from './ManualGeneratorLayout';
import GroupSelectLayout from './GroupSelectLayout';
import ApiEntryLayout from './ApiEntryLayout';
import MultiInputLayout from './MultiInputLayout';
import { All_Pannas } from '../config/GameData';
import ApiMultiInputLayout from './ApiMultiInputLayout';
import { placeBids } from '../services/apiService';
import BidSuccessDialog from '../components/BidSuccessDialog';
import BidFailureDialog from '../components/BidFailureDialog';
import BracketGeneratorLayout from './BracketLayout';

// Mock function for the final submission loop (as requested)


const isValidSP = (panna) => {
  if (panna.length !== 3) return false;
  return panna[0] !== panna[1] && panna[0] !== panna[2] && panna[1] !== panna[2];
};
const isValidDP = (panna) => {
  if (panna.length !== 3) return false;
  return (panna[0] === panna[1] && panna[1] !== panna[2]) ||
         (panna[0] === panna[2] && panna[0] !== panna[1]) ||
         (panna[1] === panna[2] && panna[0] !== panna[1]);
};

const isValidTP = (panna) => {
  if (panna.length !== 3) return false;
  return panna[0] === panna[1] && panna[1] === panna[2];
};

const BidGames = () => {
  // --- HOOKS & ROUTING ---
  const { marketType, marketId, gameType } = useParams();
  const config = gameConfigs[gameType];
  const navigate = useNavigate();
  const location = useLocation();
  //const wallet=localStorage.getItem('walletBalance');
  // --- STATE MANAGEMENT ---
  // const [walletBalance, setWalletBalance] = useState(wallet);
    //   console.log("Navigated to BidGames. The entire location.state is:", location.state);

   const openBidDisabled = location.state?.openBidDisabled || false;

    const sessionSelection = location.state?.sessionSelection;

      // console.log(`The value of sessionSelection for this game is:`, sessionSelection);

  const [selectedGameType, setSelectedGameType] = useState(
  openBidDisabled ? 'Close' : 'Open'
);
  const [digit, setDigit] = useState('');
  const [points, setPoints] = useState('');
  const [jodiDigit, setJodiDigit] = useState('');
 const [suggestions, setSuggestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [fetchedDigits, setFetchedDigits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [pannaType, setPannaType] = useState('SP');
  const [manualDigits, setManualDigits] = useState({ digit1: '', digit2: '', digit3: '' });
  const [oddEvenType, setOddEvenType] = useState('Odd');
  const [multiInputValues, setMultiInputValues] = useState({});

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState({ show: false, message: '' });
 const [bracketType, setBracketType] = useState('halfBracket'); // 'halfBracket' is the default

    const { user,updateWalletBalance } = useContext(AppContext);
   const walletBalance = user?.walletBalance || 0;
  //const { refetchUser } = useContext(AppContext);
  // CORRECTED: State initialization for all UI types
 const [bids, setBids] = useState(() => {
  if (config?.uiType === 'Numpad') { // ONLY Numpad uses an object
    return {};
  }
  return []; // All other types, including NumpadApi, MUST use an array
});

  const marketName = location.state?.marketName || `Market ${marketId}`;
   

  const pageTitle = config ? `${marketName}, ${config.title}` : 'Loading...';

  // --- HELPERS & HANDLERS ---
  const deriveSingleDigit = (pana) => (pana.split('').reduce((sum, d) => sum + parseInt(d, 10), 0) % 10).toString();
  const handleBackClick = () => navigate(-1);
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };
  
  // CRITICAL FIX: Added logic for 'NumpadApi' data structure
  // In BidGames.jsx
// In BidGames.jsx

const { totalBids, totalPoints, bidsForList } = useMemo(() => {
  // Logic for the one object-based game type
  if (config?.uiType === 'Numpad') {
    const bidEntries = Object.entries(bids);
    // const calculatedPoints = bidEntries.reduce((sum, [, p]) => sum + (parseInt(p, 10) || 0), 0);

      const calculatedPoints = bidEntries.reduce((sum, [, bidData]) => sum + (parseInt(bidData.points, 10) || 0), 0);

    // const list = bidEntries.map(([d, p]) => ({ digit: d, points: p, type: selectedGameType }));

    const list = bidEntries.map(([digit, bidData]) => ({ 
    digit: digit, 
    points: bidData.points, 
    type: bidData.type 
  }));

    return { totalBids: bidEntries.length, totalPoints: calculatedPoints, bidsForList: list };
  }
  
  // Logic for ALL array-based game types (Standard, AutoEntry, NumpadApi, etc.)
  if (Array.isArray(bids)) {
    const calculatedPoints = bids.reduce((sum, bid) => sum + (parseInt(bid.points, 10) || 0), 0);
    return { totalBids: bids.length, totalPoints: calculatedPoints, bidsForList: bids };
  }

  // Fallback for safety
  return { totalBids: 0, totalPoints: 0, bidsForList: [] };
}, [bids, config?.uiType, selectedGameType]);

  const handleDigitChange = (value) => {
    setDigit(value);
    if ((gameType === 'singlePana' || gameType === 'spMotor') && value) {
      setSuggestions(Single_Pana.filter(p => p.startsWith(value)));
    } 
    else if (gameType === 'jodi' && value) {
    setSuggestions(All_Jodis.filter(j => j.startsWith(value)));
  }
    else if (gameType === 'redBracket' && value) {
    setSuggestions(All_Jodis.filter(j => j.startsWith(value)));
     } 
      else if (gameType === 'singleDigits' && value) {
    setSuggestions(All_Digits.filter(d => d.startsWith(value)));
  }
     else if ((gameType === 'dpMotor'|| gameType === 'doublePana') && value) {
    setSuggestions(Double_Pana.filter(p => p.startsWith(value)));
  }
       else if (gameType === 'triplePana' && value) {
    setSuggestions(Triple_Pana.filter(p => p.startsWith(value)));
  }
  
      else {
      setSuggestions([]);
    }
  };
  const getCutDigit = (d) => ((parseInt(d, 10) + 5) % 10).toString();


       const handleApiMultiInputAdd = async () => {
    const { leftDigit, rightDigit, points } = multiInputValues;

    // Validation
    if (!leftDigit && !rightDigit) {
      return showMessage('Please enter at least one digit.', 'error');
    }
    if (!points || parseInt(points, 10) < 10) {
      return showMessage('Please enter points (min 10).', 'error');
    }

    setIsLoading(true);
    try {
      // Construct the request body based on which digits were provided
      const requestBody = { amount: parseInt(points, 10) };
      if (leftDigit) requestBody.leftDigit = parseInt(leftDigit, 10);
      if (rightDigit) requestBody.rightDigit = parseInt(rightDigit, 10);
      
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://admin.gama567.club/api/v1/digit-based-jodi",
        requestBody,
        { headers: {"Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "deviceId": "qwert",
      "deviceName": "sm2233",
      "accessStatus": "1",} }
      );

      if (response.data?.status && Array.isArray(response.data.info)) {
        const jodisFromApi = response.data.info;
        if (jodisFromApi.length > 0) {
          const bidType = sessionSelection ? selectedGameType : '-';
          const newBids = jodisFromApi.map(item => ({
            digit: item.pana, // The API returns the jodi in the 'pana' field
            points: item.amount.toString(),
            type: bidType, // This game type is always Jodi
          }));
          setBids(prevBids => [...prevBids, ...newBids]);
          showMessage(`${newBids.length} jodis added!`);
          setMultiInputValues({}); // Clear all inputs on success
        } else {
          showMessage('No jodis found for the entered digit(s).', 'error');
        }
      } else {
        showMessage(response.data.msg || 'Failed to fetch jodi list.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred while fetching the jodi list.', 'error');
      console.error("Digit Based Jodi API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
   const handleApiEntryAdd = async () => {
    if (!digit || digit.length !== 2) {
      return showMessage('Please enter a valid 2-digit number.', 'error');
    }
    if (!points || parseInt(points, 10) < 10) {
      return showMessage('Please enter points (min 10).', 'error');
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://admin.gama567.club/api/v1/two-digits-panel-pana",
        {
          digit: parseInt(digit, 10), // The 2-digit number
          sessionType: selectedGameType.toLowerCase(),
          amount: parseInt(points, 10),
        },
        { headers: {  deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"} }
      );

      if (response.data?.status && Array.isArray(response.data.info)) {
        const panasFromApi = response.data.info;
        if (panasFromApi.length > 0) {
          const newBids = panasFromApi.map(item => ({
            digit: item.pana,
            points: item.amount.toString(),
            type: item.sessionType,
            singleDigit: deriveSingleDigit(item.pana),
          }));
          setBids(prevBids => [...prevBids, ...newBids]);
          showMessage(`${newBids.length} panel bids added for ${digit}!`);
          setDigit(''); // Clear input on success
        } else {
          showMessage(`No panels found for ${digit}.`, 'error');
        }
      } else {
        showMessage(response.data.msg || 'Failed to fetch panel list.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred while fetching the panel list.', 'error');
      console.error("Two Digit Panel API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

       const handleMultiInputChange = (fieldId, value) => {
    setMultiInputValues(prev => ({ ...prev, [fieldId]: value }));

    // Handle autocomplete for the closePanna field
    const fieldConfig = config.fields.find(f => f.id === fieldId);
       if (fieldConfig?.hasAutocomplete && value) {
       const filtered = All_Pannas.filter(p => p.startsWith(value));
    // Update only the suggestions for the currently active field
    setSuggestions({ [fieldId]: filtered });
     } else {
      setSuggestions({});
    }
  };

  const handleMultiInputSuggestionClick = (fieldId, suggestion) => {
    setMultiInputValues(prev => ({ ...prev, [fieldId]: suggestion }));
     setSuggestions({});
  };

      // In BidGames.jsx
const handleMultiInputAddBid = () => {
  const { points } = multiInputValues;

  // Common validation for points
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Please enter points (min 10).', 'error');
  }

  let newBid = {};
  let sangam = '';

  // Logic for Half Sangam A
  if (gameType === 'halfSangamA') {
    const { openDigit, closePanna } = multiInputValues;
    if (!openDigit || !/^[0-9]$/.test(openDigit)) return showMessage('Please enter a valid Open Digit.', 'error');
    if (!closePanna || !All_Pannas.includes(closePanna)) return showMessage('Please enter a valid Close Panna.', 'error');
    
    sangam = `${openDigit}-${closePanna}`;
    newBid = { digit: openDigit, pana: closePanna, points, type: gameType, sangam };
  } 
  // Logic for Half Sangam B
  else if (gameType === 'halfSangamB') {
    const { openPanna, closeAnk } = multiInputValues;
    if (!openPanna || !All_Pannas.includes(openPanna)) return showMessage('Please enter a valid Open Panna.', 'error');
    if (!closeAnk || !/^[0-9]$/.test(closeAnk)) return showMessage('Please enter a valid Close Ank.', 'error');

    sangam = `${openPanna}-${closeAnk}`;
    newBid = { digit: closeAnk, pana: openPanna, points, type: gameType, sangam };
  }
  // ADDED: Logic for Full Sangam
  else if (gameType === 'fullSangam') {
    const { openPanna, closePanna } = multiInputValues;
    if (!openPanna || !All_Pannas.includes(openPanna)) return showMessage('Please enter a valid Open Panna.', 'error');
    if (!closePanna || !All_Pannas.includes(closePanna)) return showMessage('Please enter a valid Close Panna.', 'error');

    sangam = `${openPanna}-${closePanna}`;
    // For internal consistency, we'll map them to 'digit' and 'pana' but also store original keys
    newBid = { digit: openPanna, pana: closePanna, points, type: gameType, sangam, openPanna, closePanna };
  }

  // Common logic for checking duplicates and adding the bid
  if (bids.some(b => b.sangam === sangam)) {
    return showMessage(`Bid for ${sangam} already exists.`, 'error');
  }
  
  setBids(prev => [...prev, newBid]);
  showMessage(`Bid for ${sangam} added!`);
  setMultiInputValues({});
};

 const handleGroupAdd = () => {
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Please enter points (min 10).', 'error');
  }

  const oddDigits = ['1', '3', '5', '7', '9'];
  const evenDigits = ['0', '2', '4', '6', '8'];
  
  const digitsToAdd = oddEvenType === 'Odd' ? oddDigits : evenDigits;

  const newGroupBids = digitsToAdd.map(d => ({
    digit: d,
    points: points,
    type: selectedGameType,
    bidType: oddEvenType, // Store 'Odd' or 'Even' for display
  }));

  // The filtering logic has been removed.
  // We now simply add the new bids to whatever is already in the list.
  setBids(prevBids => [...prevBids, ...newGroupBids]);
  
  showMessage(`${oddEvenType} group added with ${points} points each.`);
  setPoints(''); // Clear points for next entry
};

  const handleSuggestionClick = (suggestion) => {
    setDigit(suggestion);
    setSuggestions([]);
  };


    // In BidGames.jsx
const handleBracketGenerate = async () => {
  // 1. Validation
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Points must be at least 10.', 'error');
  }

  setIsLoading(true);
  try {
    // 2. Make the API Call
    const token = localStorage.getItem("accessToken");
    // IMPORTANT: Use your actual endpoint for Bracket generation
    const response = await axios.post(
      "https://admin.gama567.club/api/v1/red-bracket-jodi", 
      {
        type: bracketType, // 'halfBracket' or 'fullBracket'
        amount: parseInt(points, 10),
      },
      { headers: { deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" } }
    );

    // 3. Handle the API Response
    if (response.data?.status && Array.isArray(response.data.info)) {
      const bidsFromApi = response.data.info;
      if (bidsFromApi.length > 0) {
        const bidType = sessionSelection ? selectedGameType : '-'; // Will correctly be '-'
        const newBids = bidsFromApi.map(item => ({
          digit: item.pana, // The API returns the jodi in the 'pana' field
          points: item.amount.toString(),
          type: bidType,
        }));

        setBids(prevBids => [...prevBids, ...newBids]);
        showMessage(`${newBids.length} ${bracketType === 'halfBracket' ? 'Half' : 'Full'} Bracket bids added!`);
      } else {
        showMessage(`No bids generated for ${bracketType}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || 'Failed to generate bids.', 'error');
    }
  } catch (error) {
    showMessage('An error occurred while generating bids.', 'error');
    console.error("Bracket Generate API Error:", error);
  } finally {
    setIsLoading(false);
    setPoints(''); // Only clear points, as the bracket type selection should remain
  }
};



const handleAddBid = async() => {
  // --- Game-specific validation ---
    
       if (gameType === 'dpMotor') {
  // 1. New Validation Logic
  if (!digit) {
    return showMessage('Please enter a number.', 'error');
  }
  if (parseInt(digit, 10) <= 9) {
    return showMessage('Number must be greater than 9.', 'error');
  }
  if (new Set(digit.split('')).size < 2) {
    return showMessage('Number must have at least two unique digits.', 'error');
  }
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Points must be at least 10.', 'error');
  }

  setIsLoading(true);
  try {
    // 2. Make the API Call
    const token = localStorage.getItem("accessToken");
    // IMPORTANT: Replace with your actual endpoint for DP Motor generation
    const response = await axios.post(
      "https://admin.gama567.club/api/v1/dp-motor-pana", 
      {
        digit: digit, // Pass the full number as a string or number
        amount: parseInt(points, 10),
        sessionType: selectedGameType.toLowerCase(), 
      },
      { headers: {deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" } }
    );

    // 3. Handle the API Response
    if (response.data?.status && Array.isArray(response.data.info)) {
      const bidsFromApi = response.data.info;
      if (bidsFromApi.length > 0) {
        const newBids = bidsFromApi.map(item => ({
          digit: item.pana, // Assuming the API returns the bid number in a 'pana' field
          points: item.amount.toString(),
          type: selectedGameType, // Use the currently selected session type
        }));
        
        setBids(prevBids => [...prevBids, ...newBids]);
        showMessage(`${newBids.length} DP Motor bids added for ${digit}!`);
      } else {
        showMessage(`No bids generated for ${digit}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || 'Failed to generate bids.', 'error');
    }
  } catch (error) {
    showMessage('An error occurred while generating bids.', 'error');
    console.error("DP Motor Generate API Error:", error);
  } finally {
    setIsLoading(false);
    // Clear inputs
    setDigit('');
    setPoints('');
  }
  return; // IMPORTANT: Stop the function here for dpMotor
}

  // This is the new code block for the SP Motor game
if (gameType === 'spMotor') {
  // 1. New Validation Logic
  if (!digit) {
    return showMessage('Please enter a number.', 'error');
  }
  if (digit.length < 3) {
    return showMessage('Number must be at least 3 digits.', 'error');
  }
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Points must be at least 10.', 'error');
  }

  setIsLoading(true);
  try {
    // 2. Make the API Call
    const token = localStorage.getItem("accessToken");
    // IMPORTANT: Replace with your actual endpoint for SP Motor generation
    const response = await axios.post(
      "https://admin.gama567.club/api/v1/sp-motor-pana", 
      {
        digit: digit,
        amount: parseInt(points, 10),
        sessionType: selectedGameType.toLowerCase(), 
      },
      { headers: { deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" } }
    );

    // 3. Handle the API Response
    if (response.data?.status && Array.isArray(response.data.info)) {
      const bidsFromApi = response.data.info;
      if (bidsFromApi.length > 0) {
        const newBids = bidsFromApi.map(item => ({
          digit: item.pana, 
          points: item.amount.toString(),
          type: selectedGameType,
        }));
        
        setBids(prevBids => [...prevBids, ...newBids]);
        showMessage(`${newBids.length} SP Motor bids added for ${digit}!`);
      } else {
        showMessage(`No bids generated for ${digit}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || 'Failed to generate bids.', 'error');
    }
  } catch (error) {
    showMessage('An error occurred while generating bids.', 'error');
    console.error("SP Motor Generate API Error:", error);
  } finally {
    setIsLoading(false);
    setDigit('');
    setPoints('');
  }
  return; // Stop the function here
}
    
       if (gameType === 'panelGroup') {
    // 1. Validation for a 3-digit pana number
    if (!digit || !All_Pannas.includes(digit)) {
      return showMessage('Please enter a valid 3-digit Pana number.', 'error');
    }
    if (!points || parseInt(points, 10) < 10) {
      return showMessage('Points must be at least 10.', 'error');
    }

    setIsLoading(true);
    try {
      // 2. Make the API Call
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://admin.gama567.club/api/v1/panel-group-pana", // IMPORTANT: Replace with your actual endpoint
        {
          digit: parseInt(digit, 10),
          amount: parseInt(points, 10),
          // Since there is no selector, we send a default value or null
          // Based on your example, the API might expect "open"
          sessionType: "open", 
        },
        { headers: {  deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"} }
      );

      // 3. Handle the API Response
      if (response.data?.status && Array.isArray(response.data.info)) {
        const bidsFromApi = response.data.info;
        if (bidsFromApi.length > 0) {
          const newBids = bidsFromApi.map(item => ({
            digit: item.pana,
            points: item.amount.toString(),
            sessionType: "Open", // Set a fixed type
          }));
          
          setBids(prevBids => [...prevBids, ...newBids]);
          showMessage(`${newBids.length} panel group bids added for ${digit}!`);
        } else {
          showMessage(`No panel group found for ${digit}.`, 'error');
        }
      } else {
        showMessage(response.data.msg || 'Failed to fetch panel group.', 'error');
      }
    } catch (error) {
      showMessage('An error occurred while fetching the panel group.', 'error');
      console.error("Panel Group API Error:", error);
    } finally {
      setIsLoading(false);
      // Clear inputs
      setDigit('');
      setPoints('');
    }
    return; // IMPORTANT: Stop the function here for panelGroup
  }   

  if (gameType === 'groupJodi') {
    if (!digit || !/^\d{2}$/.test(digit)) {
      return showMessage('Please enter a valid 2-digit Jodi (00-99).', 'error');
    }
    // Continue to the generation logic below
  }
  // else if ((gameType === 'singlePana' || gameType === 'spMotor' || gameType === 'dpMotor'|| gameType === 'doublePana') && !All_Pannas.includes(digit)) {
  //   // Note: Updated to use All_Pannas for DP motor as well
  //   return showMessage('Please enter a valid Panna number.', 'error');
  // }

  // Check for 'singlePana'
if (gameType === 'singlePana' && !Single_Pana.includes(digit)) {
    return showMessage('Please enter or select a valid Single Pana.', 'error');
}
// NEW: Add a specific check for 'doublePana' against the correct list
else if (gameType === 'doublePana' && !Double_Pana.includes(digit)) {
    return showMessage('Please enter or select a valid Double Pana.', 'error');
}
// MODIFIED: The old check now handles only the remaining panna types



  else if (gameType === 'triplePana' && !Triple_Pana.includes(digit)) {
    return showMessage('Please enter a valid Triple Pana number.', 'error');
  }
  else if (gameType === 'jodi' && (!digit || !/^\d{2}$/.test(digit))) {
    return showMessage('Please enter a valid 2-digit number (00-99).', 'error');
  }
  else if ((gameType === 'singleDigits' ) && (!digit || !/^[0-9]$/.test(digit))) {
    return showMessage('Please enter a valid single digit (0-9).', 'error');
  }

  // --- Common validation ---
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Points must be at least 10.', 'error');
  }

  // --- LOGIC FOR ADDING BIDS ---
  // In handleAddBid, replace the old groupJodi block with this
if (gameType === 'groupJodi') {
  // 1. Standard Validation
  if (!digit || !/^\d{2}$/.test(digit)) {
    return showMessage('Please enter a valid 2-digit Jodi (00-99).', 'error');
  }
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Points must be at least 10.', 'error');
  }

  setIsLoading(true);
  try {
    // 2. Make the API Call to your Group Jodi endpoint
    const token = localStorage.getItem("accessToken");
    // IMPORTANT: Use your actual endpoint for Group Jodi generation
    const response = await axios.post(
      "https://admin.gama567.club/api/v1/group-jodi", 
      {
        digit: digit,
        amount: parseInt(points, 10),
        sessionType:'open'
      },
      { headers: { deviceId: "qwert",
            deviceName: "sm2233",
            accessStatus: "1",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" } }
    );

    // 3. Handle the API Response
    if (response.data?.status && Array.isArray(response.data.info)) {
      const bidsFromApi = response.data.info;
      if (bidsFromApi.length > 0) {
        
        // This logic preserves the API order
        const bidType = sessionSelection ? selectedGameType : '-';
        const newBids = bidsFromApi.map(item => ({
          digit: item.pana, // Assuming the API returns the bid number in a 'jodi' field
          points: item.amount.toString(),
          type: bidType,
        }));
        
        // This adds the new bids to the end of the list, preserving order
        setBids(prevBids => [...prevBids, ...newBids]);
        showMessage(`${newBids.length} Group Jodi bids added!`);

      } else {
        showMessage(`No bids generated for ${digit}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || 'Failed to generate bids.', 'error');
    }
  } catch (error) {
    showMessage('An error occurred while generating bids.', 'error');
    console.error("Group Jodi Generate API Error:", error);
  } finally {
    setIsLoading(false);
    setDigit('');
    setPoints('');
  }
  return; // Stop the function here
}
else {
    // --- Existing logic for all other Standard games ---
    const newBids = [...bids];
    let existingBidIndex = -1;

    if (gameType === 'redBracket') {
      existingBidIndex = newBids.findIndex(b => b.digit === digit);
    } else {
      existingBidIndex = newBids.findIndex(b => b.digit === digit && b.type === selectedGameType);
    }
    
    const updateableGameTypes = ['singleDigits', 'singlePana', 'panelGroup','doublePana','triplePana'];

    if (existingBidIndex > -1 && updateableGameTypes.includes(gameType)) {
      newBids[existingBidIndex].points = 
        (parseInt(newBids[existingBidIndex].points, 10) + parseInt(points, 10)).toString();
      showMessage(`Updated points for ${digit}`);
    } else {
       const bidType = sessionSelection ? selectedGameType : '-';
     // const type = (gameType === 'redBracket') ? 'Jodi' : selectedGameType;
      newBids.push({ digit, points, type:bidType });
      showMessage('Bid added successfully!');
    }
    setBids(newBids);
  }
  
  // --- Reset inputs ---
  setDigit('');
  setPoints('');
  setSuggestions([]);
};
  
  const handleNumpadBid = (num) => { /* For Numpad layout */
    if (!points || parseInt(points, 10) < 10) return showMessage('Please enter points (min 10).', 'error');
    setBids(prevBids => ({ ...prevBids, [num]: {points ,type: selectedGameType }}));
  };

  const handleAutoEntry = (value) => { /* For AutoEntry layout */
    setJodiDigit(value);
    if (value.length !== 2) return;
    if (!points || parseInt(points, 10) < 10) {
      setTimeout(() => setJodiDigit(''), 100);
      return showMessage('Please enter points (min 10).', 'error');
    }
    if (bids.some(bid => bid.digit === value)) {
      setTimeout(() => setJodiDigit(''), 100);
      return showMessage(`Jodi ${value} has already been added.`, 'error');
    }
     const bidType = sessionSelection ? selectedGameType : '-';
  setBids(prevBids => [...prevBids, { digit: value, points, type: bidType }]);
    showMessage(`Jodi ${value} with ${points} points added.`);
    setJodiDigit('');
   // setPoints('');
  };

  // FULLY INTEGRATED: Real API call for fetching Pana list
  // In BidGames.jsx
const handleManualAddBid = () => {
  const { digit1, digit2, digit3 } = manualDigits;

  // Validation
  if (!digit1 || !digit2 || !digit3) {
    return showMessage('Please enter all three digits.', 'error');
  }
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Please enter points (min 10).', 'error');
  }
  if (!pannaType) {
    return showMessage('Please select a Panna type (SP, DP, or TP).', 'error');
  }

  const combinedPanna = `${digit1}${digit2}${digit3}`;
  let isValid = false;

  // Check if the created panna matches the selected type
  if (pannaType === 'SP') isValid = isValidSP(combinedPanna);
  else if (pannaType === 'DP') isValid = isValidDP(combinedPanna);
  else if (pannaType === 'TP') isValid = isValidTP(combinedPanna);

  if (!isValid) {
    return showMessage(`The number ${combinedPanna} is not a valid ${pannaType} Panna.`, 'error');
  }

  // Check for duplicates
  if (bids.some(b => b.digit === combinedPanna && b.type === selectedGameType)) {
    return showMessage(`${combinedPanna} has already been added for this type.`, 'error');
  }

  // Add the bid
  const newBid = { digit: combinedPanna, points, type: selectedGameType, gameType: pannaType };
  setBids(prev => [...prev, newBid]);
  showMessage(`${pannaType} Panna ${combinedPanna} added successfully!`);

  // Reset inputs
  setManualDigits({ digit1: '', digit2: '', digit3: '' });
  setPoints('');
};

const handleNumpadApiClick = async (digit) => {
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Please enter points (min 10).', 'error');
  }

  setIsLoading(true);
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `https://admin.gama567.club/api/v1/${gameType.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`,
      { digit, sessionType: selectedGameType.toLowerCase(), amount: parseInt(points, 10) },
      { headers: { "Authorization": `Bearer ${token}`, /* ...other headers... */ } }
    );

    if (response.data?.status && Array.isArray(response.data.info)) {
      const panasFromApi = response.data.info;

      if (panasFromApi.length > 0) {
        // Create an ARRAY of new bid objects
        const newBidsArray = panasFromApi.map(item => ({
          digit: item.pana, // This key holds the Pana number
          points: item.amount.toString(),
          type: item.sessionType,
          singleDigit: deriveSingleDigit(item.pana), // Derived digit for final submission
        }));

        // Add the new bids to the existing ARRAY of bids
        setBids(prevBids => [...prevBids, ...newBidsArray]);
        
        showMessage(`${newBidsArray.length} bids for digit ${digit} added!`);
      } else {
        showMessage(`No panas found for digit ${digit}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || 'Failed to fetch pana list.', 'error');
    }
  } catch (error) {
    showMessage('An error occurred while fetching the pana list.', 'error');
    console.error(`${gameType} API Error:`, error);
  } finally {
    setIsLoading(false);
  }
};

  const handleRemoveBid = (indexToRemove) => {
     if (config.uiType === 'Numpad') {
    const keyToDelete = bidsForList[indexToRemove]?.digit;
    if (keyToDelete) {
      const newBids = { ...bids };
      delete newBids[keyToDelete];
      setBids(newBids);
    }
  } else {
    // Logic for ALL array-based bids (Standard, AutoEntry, NumpadApi)
    setBids(bids.filter((_, index) => index !== indexToRemove));
  }
  showMessage('Bid removed.', 'error');
  };

  // --- SUBMISSION HANDLERS ---
  const handleSubmitClick = () => {
    if (totalBids === 0) return;
    if (totalPoints > walletBalance) return showMessage('Insufficient wallet balance.', 'error');
    setIsModalOpen(true);
  };

        // In BidGames.jsx

const handleGenerateBids = async () => {
  if (!points || parseInt(points, 10) < 10) {
    return showMessage('Please enter points (min 10).', 'error');
  }
   if (!digit || !/^[0-9]$/.test(digit)) {
    return showMessage('Please enter a valid single digit (0-9).', 'error');
  }
  if (!pannaType) {
    return showMessage('Please select SP, DP, or TP.', 'error');
  }
   setIsLoading(true);
     
    let apiEndpoint = '';
  switch (pannaType) {
    case 'SP':
      apiEndpoint = 'https://admin.gama567.club/api/v1/single-pana-bulk';
      break;
    case 'DP':
      apiEndpoint = 'https://admin.gama567.club/api/v1/double-pana-bulk';
      break;
    case 'TP':
      apiEndpoint = 'https://admin.gama567.club/api/v1/triple-pana-bulk';
      break;
    default:
      setIsLoading(false);
      return showMessage('Invalid Panna Type selected.', 'error');
  }

   try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      apiEndpoint, 
      {
        // --- 3. Construct the new request body ---
        digit: parseInt(digit, 10),
        sessionType: selectedGameType.toLowerCase(),
        amount: parseInt(points, 10)
      },
      { headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "deviceId": "qwert",
      "deviceName": "sm2233",
      "accessStatus": "1",} }
    );

    // --- 4. Handle the API response (same as before) ---
    if (response.data?.status && Array.isArray(response.data.info)) {
      const bidsFromApi = response.data.info;
      if (bidsFromApi.length > 0) {
        const newBids = bidsFromApi.map(item => ({
          digit: item.pana,
          points: item.amount.toString(),
          type: selectedGameType,
        }));
        
        setBids(prevBids => [...prevBids, ...newBids]);
        showMessage(`${newBids.length} ${pannaType} bids added for digit ${digit}!`);
        // Clear inputs on success
        setDigit('');
        setPoints('');
      } else {
        showMessage(`No bids found for digit ${digit}.`, 'error');
      }
    } else {
      showMessage(response.data.msg || `Failed to fetch ${pannaType} list.`, 'error');
    }
  } catch (error) {
    showMessage('An error occurred while fetching the bid list.', 'error');
    console.error("Generate Bids API Error:", error);
  } finally {
    setIsLoading(false);
  }


 // const generatedBids = [];
 // const existingPannas = new Set(bids.map(b => b.digit));

  // --- NEW LOGIC FOR TP ---
  // if (pannaType === 'TP') {
  //   const allTriplePanas = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'];
    
  //   allTriplePanas.forEach(pana => {
  //     // Add the pana only if it's not already in the bids list
  //     if (!existingPannas.has(pana)) {
  //       generatedBids.push({
  //         digit: pana,
  //         points: points,
  //         type: selectedGameType,
  //       });
  //     }
  //   });
  // } 
  // // --- EXISTING LOGIC FOR SP and DP ---
  // else {
  //   let attempts = 0;
  //   while (generatedBids.length < 10 && attempts < 1000) {
  //     const randomPanna = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  //     let isValid = false;

  //     if (pannaType === 'SP') isValid = isValidSP(randomPanna);
  //     else if (pannaType === 'DP') isValid = isValidDP(randomPanna);
      
  //     if (isValid && !existingPannas.has(randomPanna)) {
  //       generatedBids.push({
  //         digit: randomPanna,
  //         points: points,
  //         type: selectedGameType,
  //       });
  //       existingPannas.add(randomPanna);
  //     }
  //     attempts++;
  //   }
  // }

  // if (generatedBids.length > 0) {
  //   setBids(prevBids => [...prevBids, ...generatedBids]);
  //   showMessage(`${generatedBids.length} ${pannaType} bids added!`);
  // } else {
  //   showMessage(`Could not generate new unique ${pannaType} bids.`, 'error');
  // }
};

// const handleConfirmSubmit = async () => {
//   setIsLoading(true);
//   setIsModalOpen(false); // Close the confirmation modal immediately

//   let allSuccessful = true;
//   const registerId = localStorage.getItem("registerId");
//   const lowerMarketName = marketName.toLowerCase();
  
//   // LOGIC BRANCH 1: For games that submit bids one-by-one in a loop
//   if (config.uiType === 'NumpadApi') {
//     let apiEndpoint = '/place-bid';
//     if (lowerMarketName.includes('jackpot')) apiEndpoint = '/place-jackpot-bid';
//     else if (lowerMarketName.includes('starline')) apiEndpoint = '/place-starline-bid';

//     const submissionPromises = bidsForList.map(bid => {
//       const singleBidPayload = [{
//         sessionType: bid.dayType,
//         digit: bid.singleDigit,
//         pana: bid.digit,
//         bidAmount: parseInt(bid.points, 10),
//       }];
      
//       const body = {
//         registerId,
//         gameId: parseInt(marketId, 10),
//         gameType,
//         bidAmount: parseInt(bid.points, 10),
//         bid: singleBidPayload,
//       };
      
//       return placeBids(apiEndpoint, body);
//     });

//     try {
//       const results = await Promise.all(submissionPromises);
//       allSuccessful = results.every(res => res.status === true);
//     } catch (error) {
//       allSuccessful = false;
//       console.error("Error during looped submission:", error);
//     }
//   } 
//   // LOGIC BRANCH 2: For all other games that submit bids in a single batch
//   else {
//     let apiEndpoint = '/place-bid';
//     if (lowerMarketName.includes('jackpot')) apiEndpoint = '/place-jackpot-bid';
//     else if (lowerMarketName.includes('starline')) apiEndpoint = '/place-starline-bid';
//     else if (gameType === 'choicePannaSpDp') apiEndpoint = '/choice-pana';
    
//     let finalApiBids = [];
    
//     switch (gameType) {
//       case 'singlePana':
//         finalApiBids = bidsForList.map(b => ({ sessionType: b.type, digit: '', pana: b.digit, bidAmount: parseInt(b.points, 10) }));
//         break;
//       case 'halfSangamA':
//         finalApiBids = bidsForList.map(b => ({ sessionType: "HALFSANGAMA", digit: b.digit, pana: b.pana, bidAmount: parseInt(b.points, 10) }));
//         break;
//       case 'halfSangamB':
//         finalApiBids = bidsForList.map(b => ({ sessionType: "HALFSANGAMB", digit: b.digit, pana: b.pana, bidAmount: parseInt(b.points, 10) }));
//         break;
//       case 'fullSangam':
//         finalApiBids = bidsForList.map(b => ({ sessionType: "FULLSANGAM", openPana: b.openPana, closePana: b.closePana, bidAmount: parseInt(b.points, 10) }));
//         break;
//       default:
//         finalApiBids = bidsForList.map(b => ({
//           sessionType: b.type || 'OPEN',
//           digit: b.digit,
//           pana: b.digit,
//           bidAmount: parseInt(b.points, 10),
//         }));
//         break;
//     }

//     const body = {
//       registerId,
//       gameId: parseInt(marketId, 10),
//       gameType,
//       bidAmount: totalPoints,
//       bid: finalApiBids,
//     };
    
//     const result = await placeBids(apiEndpoint, body);
//     allSuccessful = result.status === true;
//   }

//   // --- Handle the final result of the submission(s) ---
//   if (allSuccessful) {
//     const newBalance = walletBalance - totalPoints;
//     setWalletBalance(newBalance); 
//     localStorage.setItem('walletBalance', newBalance.toString());

//     setBids(config.uiType === 'Numpad' || config.uiType === 'NumpadApi' ? {} : []);
//     setShowSuccessDialog(true);
//   } else {
//     setShowFailureDialog({ show: true, message: "One or more bids failed to place. Please check your bids and try again." });
//   }
  
//   setIsLoading(false);
// };

     const handleConfirmSubmit = async () => {
  setIsLoading(true);
  setIsModalOpen(false);

  let allSuccessful = true;
  const registerId = localStorage.getItem("registerId");
  const lowerMarketName = marketType.toLowerCase();
  
  let apiEndpoint = '/place-bid';
  if (lowerMarketName.includes('jackpot')) apiEndpoint = '/place-jackpot-bid';
  else if (lowerMarketName.includes('starline')) apiEndpoint = '/place-starline-bid';

  let finalApiBids = [];
  
  switch (gameType) {
    case 'singlePana':
      finalApiBids = bidsForList.map(b => ({
        sessionType: b.type || 'OPEN',
        digit: '',
        pana: b.digit,
        bidAmount: parseInt(b.points, 10),
      }));
      break;
    
    case 'NumpadApi':
      finalApiBids = bidsForList.map(b => ({
        sessionType: b.dayType,
        digit: b.singleDigit,
        pana: b.digit,
        bidAmount: parseInt(b.points, 10),
      }));
      break;

    case 'halfSangamA':
      finalApiBids = bidsForList.map(b => ({
        sessionType: "OPEN", // Use default "OPEN" as it has no selector
        digit: b.digit,      // Open Digit
        pana: b.pana,      // Close Panna
        bidAmount: parseInt(b.points, 10),
      }));
      break;

    case 'halfSangamB':
      finalApiBids = bidsForList.map(b => ({
        sessionType: "OPEN", // Use default "OPEN"
        digit: b.digit,      // Close Ank
        pana: b.pana,      // Open Panna
        bidAmount: parseInt(b.points, 10),
      }));
      break;

    case 'fullSangam':
       finalApiBids = bidsForList.map(b => ({
    sessionType: "OPEN", // Use default "OPEN"
    // CORRECTED: Map the data to the exact keys the API expects for Full Sangam
    pana: b.openPanna,    // The Open Panna goes into the 'pana' field
    digit: b.closePanna,  // The Close Panna goes into the 'digit' field
    bidAmount: parseInt(b.points, 10),
      }));
      break;
      
    default:
      // This handles all other games (Single Digit, Jodi, Panel Group, etc.)
      finalApiBids = bidsForList.map(b => ({
        // Use the selected type if available (from a dropdown), otherwise default to 'OPEN'
        sessionType: b.type || 'OPEN', 
        digit: b.digit,
        pana: b.digit,
        bidAmount: parseInt(b.points, 10),
      }));
      break;
  }

  const body = {
    registerId,
    gameId: parseInt(marketId, 10),
    gameType,
    bidAmount: totalPoints,
    bid: finalApiBids,
  };
  
  const result = await placeBids(apiEndpoint, body);
  allSuccessful = result.status === true;

  if (allSuccessful) {
    const newBalance = walletBalance - totalPoints;
     updateWalletBalance(newBalance);
    // setWalletBalance(newBalance); 
    // localStorage.setItem('walletBalance', newBalance.toString());
    // await refetchUser();
    setBids(config.uiType === 'Numpad' ? {} : []);
    setShowSuccessDialog(true);
  } else {
    setShowFailureDialog({ show: true, message: result.msg || "An unknown error occurred." });
  }
  
  setIsLoading(false);
};       

   console.log({
    gameType: gameType,
    bidsState: bids,
    totalBidsFromMemo: totalBids
  });


     


  if (!config) {
    return <div className="mainhome-screen-wrapper"><div>Error: Game type '{gameType}' not found in configuration.</div></div>;
  }

  // --- RENDER ---
  // return (
  //   <div className="mainhome-screen-wrapper">
  //     <MessageBar message={message?.text} type={message?.type} />
  //     <Header title={pageTitle} walletBalance={walletBalance} onBackClick={handleBackClick} />
  //     <main className="game-content">
  //       <div className="form-container">
  //         {(() => {
  //           const props = { config, points, setPoints, selectedGameType, setSelectedGameType, isLoading };
  //           switch (config.uiType) {
  //             case 'NumpadApi':
  //               return <NumpadApiLayout {...props} {...{ handleNumpadApiClick}} />;
  //             case 'AutoEntry':
  //               return <AutoEntryLayout {...props} {...{ jodiDigit, handleAutoEntry }} />;
  //             case 'Numpad':
  //               return <NumpadLayout {...props} {...{ handleNumpadBid, bids }} />;
  //             case 'Standard':
  //               return <StandardLayout {...props} {...{ gameType, digit, handleDigitChange, handleAddBid, suggestions, handleSuggestionClick }} />;
  //             case 'ManualGenerator':
  //               return <ManualGeneratorLayout {...props} {...{ pannaType, setPannaType, manualDigits, setManualDigits, onAddBid: handleManualAddBid }} />;
  //             case 'Generator':
  //               return <GeneratorLayout {...props} {...{ pannaType, setPannaType, onGenerateBids: handleGenerateBids }} />;
  //             case 'ApiEntry':
  //                return <ApiEntryLayout {...props} {...{ digit, setDigit, onApiEntryAdd: handleApiEntryAdd }} />;
  //              case 'MultiInput':
  //                   return <MultiInputLayout {...props} values={multiInputValues} onInputChange={handleMultiInputChange} onAddBid={handleMultiInputAddBid} suggestions={suggestions} onSuggestionClick={handleMultiInputSuggestionClick} />;
  //             case 'ApiMultiInput':
  //                     return <ApiMultiInputLayout {...props} values={multiInputValues} onInputChange={handleMultiInputChange} onApiAdd={handleApiMultiInputAdd} />;
  //               case 'GroupSelect':
  //                 return <GroupSelectLayout {...props} {...{ oddEvenType, setOddEvenType, onAddGroupBids: handleGroupAdd }} />;
  //             default:
  //               return <div>Unknown UI Type</div>;
  //           }
  //         })()}
  //       </div>
  //       {totalBids > 0 && <BidsList bids={bidsForList} onRemove={handleRemoveBid} gameType={gameType} />}
  //     </main>
  //     <BottomBar totalBids={totalBids} totalPoints={totalPoints} onSubmit={handleSubmitClick} />
  //     <ConfirmationModal {...{ isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmSubmit, gameName: pageTitle, bids: bidsForList, totalBids, totalPoints, walletBalance }} />
  //         {showSuccessDialog && (
  //     <BidSuccessDialog onClose={() => setShowSuccessDialog(false)} />
  //     )}
  //     {showFailureDialog.show && (
  //       <BidFailureDialog 
  //         message={showFailureDialog.message} 
  //         onClose={() => setShowFailureDialog({ show: false, message: '' })} 
  //       />
  //     )}
  //   </div>
  // );




// --- RENDER ---
  return (
    <div className="mainhome-screen-wrapper">
      <MessageBar message={message?.text} type={message?.type} />
      <Header title={pageTitle} walletBalance={walletBalance} onBackClick={handleBackClick} />
      <main className="game-content">
        <div className="form-container">
          {(() => {
            // This variable is true only if the game config allows it AND it's not a starline/jackpot game.
            const showSessionSelector = config.sessionSelection && marketType !== 'starline' && marketType !== 'jackpot';
            
            // We pass the new 'showSessionSelector' prop to each layout that needs it.
            const props = { config, points, setPoints, selectedGameType, setSelectedGameType, isLoading, showSessionSelector,openBidDisabled, digit, setDigit };

            switch (config.uiType) {
              case 'NumpadApi':
                return <NumpadApiLayout {...props} {...{ handleNumpadApiClick }} />;
              case 'AutoEntry':
                return <AutoEntryLayout {...props} {...{ jodiDigit, handleAutoEntry }} />;
              case 'Numpad':
                return <NumpadLayout {...props} {...{ handleNumpadBid, bids }} />;
              case 'Standard':
                return <StandardLayout {...props} {...{ gameType, digit, handleDigitChange, handleAddBid, suggestions, handleSuggestionClick }} />;
              case 'ManualGenerator':
                return <ManualGeneratorLayout {...props} {...{ pannaType, setPannaType, manualDigits, setManualDigits, onAddBid: handleManualAddBid }} />;
              case 'Generator':
                return <GeneratorLayout {...props} {...{ pannaType, setPannaType, onGenerateBids: handleGenerateBids }} />;
              case 'ApiEntry':
                return <ApiEntryLayout {...props} {...{ digit, setDigit, onApiEntryAdd: handleApiEntryAdd }} />;
              case 'MultiInput':
                return <MultiInputLayout {...props} values={multiInputValues} onInputChange={handleMultiInputChange} onAddBid={handleMultiInputAddBid} suggestions={suggestions} onSuggestionClick={handleMultiInputSuggestionClick} />;
              case 'ApiMultiInput':
                return <ApiMultiInputLayout {...props} values={multiInputValues} onInputChange={handleMultiInputChange} onApiAdd={handleApiMultiInputAdd} />;
              case 'GroupSelect':
                return <GroupSelectLayout {...props} {...{ oddEvenType, setOddEvenType, onAddGroupBids: handleGroupAdd }} />;
                   case 'BracketGenerator':
                 return <BracketGeneratorLayout 
                 {...props} 
                  bracketType={bracketType}
                 setBracketType={setBracketType}
                  onGenerate={handleBracketGenerate}
                   />; 
              default:
                return <div>Unknown UI Type</div>;
            }
          })()}
        </div>
        {totalBids > 0 && <BidsList bids={bidsForList} onRemove={handleRemoveBid} gameType={gameType} />}
      </main>
      <BottomBar totalBids={totalBids} totalPoints={totalPoints} onSubmit={handleSubmitClick} />
      <ConfirmationModal {...{ isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onConfirm: handleConfirmSubmit, gameName: pageTitle, bids: bidsForList, totalBids, totalPoints, walletBalance }} />
     {showSuccessDialog && (
        <BidSuccessDialog onClose={() => setShowSuccessDialog(false)} />
      )}
      {showFailureDialog.show && (
        <BidFailureDialog 
          message={showFailureDialog.message} 
          onClose={() => setShowFailureDialog({ show: false, message: '' })} 
        />
      )}
    </div>
  );
};
export default BidGames;