





import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);
  const [mobileNo, setMobileNo] = useState(() => localStorage.getItem('mobileNo') || '');
  const [userPin, setUserPin] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (mobileNo) localStorage.setItem('mobileNo', mobileNo);
    else localStorage.removeItem('mobileNo');
  }, [mobileNo]);



  const updateWalletBalance = (newBalance) => {
    // 1. Update the user object in the context's state
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, walletBalance: newBalance.toString() };
      
      // 2. Also update localStorage with the new profile
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      localStorage.setItem('walletBalance', newBalance.toString());
      
      return updatedUser;
    });
  };

  // This function is now wrapped in useCallback to prevent it from being recreated on every render
   const resetUserContext = useCallback(() => {
    console.log("LOGGING OUT: Clearing all user data...");
    setUser(null);
    setMobileNo('');
    setUserPin('');
    setOtp('');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('registerId');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('mobileNo');
    localStorage.removeItem('feeSettings');
  }, []);

  // In AppContext.js

const fetchUserProfile = useCallback(async () => {
  const token = localStorage.getItem("accessToken");
  const registerId = localStorage.getItem("registerId");

  if (!token || !registerId) {
    setUser(null);
    setLoading(false);
    return;
  }
  
  setLoading(true);
  try {
    const response = await axios.post(
      "https://sarra777.net/api/v1/user-details-by-register-id",
      { registerId },
      { 
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "deviceId": "qwert",
          "deviceName": "sm2233",
          "accessStatus": "1",
        } 
      }
    );

    if (response.data?.status === true) {
      const userInfo = response.data.info;
      setUser(userInfo);
      localStorage.setItem('userProfile', JSON.stringify(userInfo));
      localStorage.setItem('walletBalance', userInfo.walletBalance);
    } else {
      console.error("Failed to fetch user profile, logging out:", response.data.msg);
      resetUserContext();
    }
  } catch (error) {
    console.error("API Network Error fetching user profile:", error);
  } finally {
    setLoading(false);
  }
  // FIXED: The dependency array is now correct, which prevents the infinite loop.
}, [resetUserContext]); // FIXED: Added 'user' and 'resetUserContext' to the dependency array

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        mobileNo,
        setMobileNo,
        userPin,
        setUserPin,
        otp,
        setOtp,
        resetUserContext,
        updateWalletBalance,
        refetchUser: fetchUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};









// import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
// import axios from 'axios';

// export const AppContext = createContext();

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

// export const AppProvider = ({ children }) => {
//   // --- STATE MANAGEMENT ---
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('userProfile');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
  
//   const [loading, setLoading] = useState(true);
//   const [mobileNo, setMobileNo] = useState(() => localStorage.getItem('mobileNo') || '');
//   const [userPin, setUserPin] = useState('');
//   const [otp, setOtp] = useState('');
//   const [appSettings, setAppSettings] = useState(() => {
//     const storedSettings = localStorage.getItem('appSettings');
//     return storedSettings ? JSON.parse(storedSettings) : null;
//   });

//   useEffect(() => {
//     if (mobileNo) localStorage.setItem('mobileNo', mobileNo);
//     else localStorage.removeItem('mobileNo');
//   }, [mobileNo]);

//   const resetUserContext = useCallback(() => {
//     console.log("LOGGING OUT: Clearing all user data...");
//     setUser(null);
//     setMobileNo('');
//     setUserPin('');
//     setOtp('');
//     localStorage.removeItem('userProfile');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('registerId');
//     localStorage.removeItem('walletBalance');
//     localStorage.removeItem('mobileNo');
//     localStorage.removeItem('appSettings');
//     setAppSettings(null);
//   }, []);

//   const fetchUserProfile = useCallback(async () => {
//     const token = localStorage.getItem("accessToken");
//     const registerId = localStorage.getItem("registerId");

//     if (!token || !registerId) {
//       setUser(null);
//       return; // No need to set loading false here, finally block will do it
//     }
    
//     try {
//       const response = await axios.post(
//         "https://sarra777.net/api/v1/user-details-by-register-id",
//         { registerId },
//         { 
//           headers: { 
//             "Authorization": `Bearer ${token}`, "Content-Type": "application/json",
//             "deviceId": "qwert", "deviceName": "sm2233", "accessStatus": "1",
//           } 
//         }
//       );

//       if (response.data?.status === true) {
//         const userInfo = response.data.info;
//         setUser(userInfo);
//         localStorage.setItem('userProfile', JSON.stringify(userInfo));
//         localStorage.setItem('walletBalance', userInfo.walletBalance);
//       } else {
//         console.error("Failed to fetch user profile, logging out:", response.data.msg);
//         resetUserContext();
//       }
//     } catch (error) {
//       console.error("API Network Error fetching user profile:", error);
//     }
//   }, [resetUserContext]);

//   // This useEffect runs once on initial app load to fetch all necessary data
//   useEffect(() => {
//     const initializeApp = async () => {
//       setLoading(true);
      
//       // Fetch user profile if tokens exist
//       await fetchUserProfile();

//       // --- ADDED BACK: Fetch App Settings ---
//       const storedMobileNo = localStorage.getItem("mobileNo");
//       const token = localStorage.getItem("accessToken");
//       if (storedMobileNo) {
//         try {
//            const response = await axios.get(
//             "https://sarra777.net/api/v1/fees-settings",
//             {
//               params: {
//                 mobileNo: storedMobileNo // For GET requests, data is sent in 'params'
//               },
//               headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json",
//                 "deviceId": "qwert",
//                 "deviceName": "sm2233",
//                 "accessStatus": "1"
//               }
//             }
//           );
//           console.log(response);
//           if (response.data?.status) {
//             const settings = response.data.info;
//             setAppSettings(settings);
//             localStorage.setItem('appSettings', JSON.stringify(settings));
//           }
//         } catch (error) {
//           console.error("Failed to fetch app settings:", error);
//         }
//       }
      
//       setLoading(false);
//     };

//     initializeApp();
//   }, [fetchUserProfile]); // Depends on fetchUserProfile

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser,
//         loading,
//         mobileNo,
//         setMobileNo,
//         userPin,
//         setUserPin,
//         otp,
//         setOtp,
//         appSettings, // Provide settings
//         resetUserContext,
//         refetchUser: fetchUserProfile, // Provide refetch function
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
