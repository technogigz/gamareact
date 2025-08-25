// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SideBar.css";
// import closeIcon from "../assets/icons/close.png";
// import userIcon from "../assets/icons/man1.svg";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";


// export default function Sidebar({ isOpen, onClose }) {
//    const { user, loading } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(false);

//   // Delay adding "open" class to trigger CSS transition properly
//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => setVisible(true), 10);
//     } else {
//       setVisible(false);
//     }
//   }, [isOpen]);

  // const items = [
  //   { icon: "home",    label: "Home",               path: "/home"           },
  //   { icon: "hammer",  label: "My Bids",            path: "/bids"           },
  //   { icon: "lock",    label: "MPIN",               path: "/set-new-pin"    },
  //   { icon: "doc",     label: "Passbook",           path: "/passbook"       },
  //   { icon: "chat",    label: "Chats",              path: "/support"        },
  //   { icon: "bank",    label: "Funds",              path: "/funds"          },
  //   { icon: "bell",    label: "Notifications",      path: "/notifications"  },
  //   { icon: "video",   label: "Videos",             path: "/videos"         },
  //   { icon: "rules",   label: "Notice Board/Rules", path: "/rules"          },
  //   { icon: "rates",   label: "Game Rates",         path: "/rates"          },
  //   { icon: "chart",   label: "Charts",             path: "/charts"         },
  //   { icon: "idea",    label: "Submit Idea",        path: "/submit-idea"    },
  //   { icon: "settings",label: "Settings",           path: "/settings"       },
  //   { icon: "share",   label: "Share Application",  path: "/share"          },
  //   { icon: "logout",  label: "LOGOUT",             path: "/logout"         },
  // ];

//   return (
//     <div className="sidebar-container">
//       {/* Overlay */}
//       <div
//         className={`sidebar-overlay ${isOpen ? "open" : ""}`}
//         onClick={onClose}
//       />

//       {/* Slide Panel */}
//       <aside className={`sidebar ${visible ? "open" : ""}`}>
//         <header className="sidebar-header">
//           <div className="user-info">
//             <img src={user?.profilePicture || userIcon} alt="User" className="user-icon" />
//             <div className="user-details">
//               <div className="username">{loading ? 'Loading...' : (user?.fullName || 'Guest')}</div>
//                <div className="phone">{loading ? '...' : (user?.mobileNo || '')}</div>
//                </div>
//           </div>
//           <button className="close-btn" onClick={onClose}>
//             <img src={closeIcon} alt="×" />
//           </button>
//         </header>

//         {/* Menu */}
//         <ul className="sidebar-menu">
//           {items.map(({ icon, label, path }) => (
//             <li
//               key={label}
//               onClick={() => {
//                 if (label === "LOGOUT") {
//           // 🔐 MOCK LOGOUT
//           localStorage.clear(); // clear tokens or user data
//           alert("You have been logged out."); // optional alert
//           navigate("/enter-mobile", { replace: true }); // redirect to login screen
//         } else {
//           if (path) navigate(path);
//         }
//                 onClose();
//               }}
//             >
//               <span className={`sidebar-icon icon-${icon}`} />
//               <span className="label">{label}</span>
//             </li>
//           ))}
//         </ul>
//       </aside>
//     </div>
//   );
// }



import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./SideBar.css";
import closeIcon from "../assets/icons/close.png";
import userIcon from "../assets/icons/man1.svg";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, loading, resetUserContext } = useContext(AppContext);
  
  // RE-ADDED: This state is crucial for the CSS transition to work.
  const [visible, setVisible] = useState(false);

  // RE-ADDED: This useEffect handles the animation timing.
  useEffect(() => {
    if (isOpen) {
      // A tiny delay allows the component to mount before the 'open' class is added.
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isOpen]);


  const allItems = [
    { icon: "home",     label: "Home",               path: "/home" },
    { icon: "hammer",   label: "My Bids",            path: "/bids" },
    { icon: "lock",     label: "MPIN",               path: "/set-new-pin" },
    { icon: "doc",      label: "Passbook",           path: "/passbook" },
    { icon: "chat",     label: "Chats",              href: `https://wa.me/${919306360393}` },
    { icon: "bank",     label: "Funds",              path: "/funds" },
    { icon: "bell",     label: "Notifications",      path: "/notifications" },
    { icon: "video",    label: "Videos",             path: "/videos" },
    { icon: "rules",    label: "Notice Board/Rules", path: "/rules" },
    { icon: "rates",    label: "Game Rates",         path: "/rates" },
    { icon: "chart",    label: "Charts",             path: "/charts" },
    { icon: "idea",     label: "Submit Idea",        path: "/submit-idea" },
    { icon: "settings", label: "Settings",           path: "/settings" },
    { icon: "share",    label: "Share Application",  path: "/share" },
    { icon: "logout",   label: "LOGOUT",             path: "/logout" },
  ];

  const visibleItems = user?.accountStatus === true 
    ? allItems
    : allItems.filter(item => item.label === "LOGOUT");

  // In SideBar.jsx

const handleLogout = () => {
  // 1. Call the function to clear the context state and localStorage.
  resetUserContext();
  
  // 2. Navigate AFTER a very short delay.
  // This gives the browser a moment to fully process all the 
  // localStorage.removeItem() commands before the page changes.
  setTimeout(() => {
    navigate("/", { replace: true });
    onClose(); // It's also better to call onClose after the navigation
  }, 100); // 50 milliseconds is unnoticeable to the user but crucial for the browser.
};
  return (
    // The outer container should only render when isOpen is true
    // to prevent it from blocking content when closed.
    isOpen && (
      <div className="sidebar-container">
        <div
          className={`sidebar-overlay ${visible ? "open" : ""}`}
          onClick={onClose}
        />
        {/* The 'visible' state now controls the 'open' class for the transition */}
        <aside className={`sidebar ${visible ? "open" : ""}`}>
          <header className="sidebar-header">
            <div className="user-info">
              <img 
                src={user?.profilePicture || userIcon} 
                alt="User" 
                className="user-icon" 
              />
              <div className="user-details">
                <div className="username">{loading ? 'Loading...' : (user?.fullName || 'Guest')}</div>
                <div className="phone">{loading ? '...' : (user?.mobileNo || '')}</div>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>
              <img src={closeIcon} alt="×" />
            </button>
          </header>

          <ul className="sidebar-menu">
            {visibleItems.map(({ icon, label, path ,href}) => (
              <li
                key={label}
                onClick={() => {
                  if (label === "LOGOUT") {
                    handleLogout();
                  } else if (path) {
                    navigate(path);
                    onClose();
                  } else if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                    onClose();
                  }
                }}
              >
                <span className={`sidebar-icon icon-${icon}`} />
                <span className="label">{label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    )
  );
}
