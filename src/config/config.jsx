export const gameConfigs = {
  // --- All keys are now camelCase to match the API 'type' property ---

  singleDigits: {
    title: 'SINGLE DIGITS',
    uiType: 'Standard',
    sessionSelection: true,
    fields: [
      { id: 'digit', label: 'Enter Digit (0-9):', placeholder: 'Enter a single digit', maxLength: 1 },
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/single-digits'
  },
  jodi: {
    title: 'JODI',
    uiType: 'Standard', // A standard text input is better for 2-digit numbers
    sessionSelection: false,
    fields: [
      { id: 'jodi', label: 'Enter Jodi (00-99):', placeholder: 'Enter a 2-digit number',maxLength: 2  },
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/jodi'
  },
  singlePana: {
    title: 'SINGLE PANA',
    uiType: 'Standard',
     sessionSelection: true,
    fields: [
      { id: 'pana', label: 'Enter Single Pana:', placeholder: 'e.g., 123, 479',maxLength: 3  },
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/single-pana'
  },
  doublePana: {
    title: 'DOUBLE PANA',
    uiType: 'Standard',
     sessionSelection: true,
    fields: [
      {
      id: 'pana',
      label: 'Enter Double Pana:',
      placeholder: 'e.g., 112, 550',
      maxLength: 3,            // Add this
      hasAutocomplete: true,   // Add this
    },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/double-pana'
  },
  triplePana: {
    title: 'TRIPLE PANA',
     uiType: 'Standard',
  sessionSelection: true,
  fields: [
    {
      id: 'pana',
      label: 'Enter Triple Pana:',
      placeholder: 'e.g., 111, 555',
      maxLength: 3,
      hasAutocomplete: true
    },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter Amount' }
  ],
    apiEndpoint: '/api/bid/triple-pana'
  },
  SPDPTP: {
    title: 'SP DP TP',
    uiType: 'Generator',
    sessionSelection: true,
    fields: [
       { id: 'digit', label: 'Enter Digit (0-9):', placeholder: 'Enter a single digit', maxLength: 1 },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/sp-dp-tp'
  },
  spMotor: {
    title: 'SP MOTOR',
    uiType: 'Standard',
    sessionSelection: true,
    fields: [
      { id: 'digits', label: 'Enter digit:', placeholder: 'enter SP number' ,  maxLength: 8},
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/sp-motor'
  },
  oddEven: {
    title: 'ODD EVEN',
    uiType: 'GroupSelect',
     sessionSelection: true,
    fields: [
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter Amount' }
    ],
    apiEndpoint: '/api/bid/odd-even'
  },
  groupJodi: {
     title: 'GROUP JODI',
  uiType: 'Standard',
  sessionSelection: false, // No Open/Close selector
  fields: [
    { 
      id: 'jodi', 
      label: 'Enter Jodi:', 
      placeholder: 'e.g., 16', 
      maxLength: 2 
    },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter Amount' }
  ],
  apiEndpoint: '/api/bid/group-jodi'
  },
  redBracket: {
    title: 'RED BRACKET',
    uiType: 'BracketGenerator',
    sessionSelection: false,
    fields: [
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/red-bracket'
  },
  halfSangamB: {
    title: 'HALF SANGAM B',
    uiType: 'MultiInput',
  sessionSelection: false,
    fields: [
      { id: 'openPanna', label: 'Enter Open Panna:', placeholder: 'e.g., 123', maxLength: 3, hasAutocomplete: true },
    { id: 'closeAnk', label: 'Enter Close Ank:', placeholder: 'e.g., 5', maxLength: 1 },
    { id: 'points', label: 'Enter Points:', placeholder: 'Amount' }
    ],
    apiEndpoint: '/api/bid/half-sangam-b'
  },
  singleDigitsBulk: {
    title: 'SINGLE DIGITS BULK',
    uiType: 'Numpad',
      sessionSelection: true,
    fields: [
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter common amount' }
    ],
    apiEndpoint: '/api/bid/single-digits-bulk'
  },
  jodiBulk: {
    title: 'JODI BULK',
    uiType: 'AutoEntry', // Assuming a 00-99 numpad might be a future UI
    sessionSelection: false,
    fields: [
        { 
      id: 'points', 
      label: 'Enter Points:', 
      placeholder: 'Enter Amount' 
    },
    // This is fields[1] for the Jodi input
    { 
      id: 'jodi', 
      label: 'Enter Jodi Digit:', 
      placeholder: 'Bid Digits', 
      maxLength: 2 
    }
    ],
    apiEndpoint: '/api/bid/jodi-bulk'
  },
  singlePanaBulk: {
    title: 'SINGLE PANA BULK',
    uiType: 'NumpadApi', // Bulk entry for 3-digit numbers is better with a text field
    sessionSelection: true,
    fields: [
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter  Amount' }
    ],
    apiEndpoint: '/single-pana-bulk'
  },
  doublePanaBulk: {
    title: 'DOUBLE PANA BULK',
    uiType: 'NumpadApi', // Use the same UI type as Single Pana Bulk
  sessionSelection: true,
    fields: [
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter Common Amount' }
    ],
    apiEndpoint: '/double-pana-bulk'
  },
  panelGroup: {
    title: 'PANEL GROUP',
    uiType: 'Standard',
     sessionSelection: false,
    fields: [
      { id: 'digit', label: 'Enter Pana Number:', placeholder: 'e.g., 123, 445', maxLength: 3 },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/panel-group'
  },
  choicePannaSPDP: {
    title: 'CHOICE PANNA SP DP',
    uiType: 'ManualGenerator',
     sessionSelection: true,
    fields: [
       { id: 'points', label: 'Enter Points:', placeholder: 'Amount' }
    ],
    apiEndpoint: '/api/bid/choice-panna'
  },
  dpMotor: {
    title: 'DP MOTOR',
    uiType: 'Standard',
     sessionSelection: true,
    fields: [
      {id: 'digit',
      label: 'Enter Number:', // Changed label
      placeholder: 'Enter any number', // Changed placeholder
      maxLength: 7  },
      { id: 'points', label: 'Enter Points:', placeholder: 'Enter amount' }
    ],
    apiEndpoint: '/api/bid/dp-motor'
  },
  twoDigitsPanel: {
    title: 'TWO DIGITS PANEL',
    uiType: 'ApiEntry',
  sessionSelection: false, 
    fields: [
       { id: 'digit', label: 'Enter Two Digits:', placeholder: 'e.g., 12', maxLength: 2 },
    { id: 'points', label: 'Enter Points:', placeholder: 'Enter Amount' }
    ],
    apiEndpoint: '/api/bid/two-digits-panel'
  },
  digitBasedJodi: {
    title: 'DIGIT BASED JODI',
   uiType: 'ApiMultiInput',
  sessionSelection: false, // No Open/Close
  fields: [
    { id: 'leftDigit', label: 'Left Digit:', placeholder: 'e.g., 1', maxLength: 1 },
    { id: 'rightDigit', label: 'Right Digit:', placeholder: 'e.g., 6', maxLength: 1 },
    { id: 'points', label: 'Enter Points:', placeholder: 'Amount', maxLength: 4 }
  ],
    apiEndpoint: '/api/bid/digit-based-jodi'
  },
  halfSangamA: {
    title: 'HALF SANGAM A',
    uiType: 'MultiInput',
  sessionSelection: false,
    fields: [
       { id: 'openDigit', label: 'Enter Open Digit:', placeholder: 'e.g., 5', maxLength: 1 },
    { id: 'closePanna', label: 'Enter Close Panna:', placeholder: 'e.g., 123', maxLength: 3, hasAutocomplete: true },
    { id: 'points', label: 'Enter Points:', placeholder: 'Amount', maxLength: 4 }
    ],
    apiEndpoint: '/api/bid/half-sangam-a'
  },
  fullSangam: {
    title: 'FULL SANGAM',
     uiType: 'MultiInput',
  sessionSelection: false,
    fields: [
     { id: 'openPanna', label: 'Enter Open Panna:', placeholder: 'e.g., 123', maxLength: 3, hasAutocomplete: true },
    { id: 'closePanna', label: 'Enter Close Panna:', placeholder: 'e.g., 456', maxLength: 3, hasAutocomplete: true },
    { id: 'points', label: 'Enter Points:', placeholder: 'Amount', maxLength: 4 }
    ],
    apiEndpoint: '/api/bid/full-sangam'
  }
};