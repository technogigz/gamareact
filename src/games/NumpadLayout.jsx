import React from 'react';
import Numpad from './Numpad';
import DateChip from '../components/DateChip';
const NumpadLayout = ({ config, points, setPoints, handleNumpadBid, bids, selectedGameType, setSelectedGameType,openBidDisabled, }) => (
  <>
    <div className="input-row">
        <DateChip/>
      {/* <label>Select Game Type:</label> */}
       <select value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)}>
        
        {/* <<<< 2. OPTION IS CONDITIONALLY RENDERED >>>> */}
        {!openBidDisabled && <option value="Open">Open</option>}

        <option value="Close">Close</option>
      </select>
    </div>
    <div className="input-row">
      <label>{config.fields[0].label}</label>
      <input 
        type="tel" 
        value={points} 
        onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder={config.fields[0].placeholder} 
      />
    </div>
    <Numpad bids={bids} onNumberClick={handleNumpadBid} />
  </>
);

export default NumpadLayout;