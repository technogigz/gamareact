// import { useNavigate, useLocation } from "react-router-dom";
// import "./BottomNav.css";

// /*  Centralised nav config  */
// const navItems = [
//   { icon: "hammer", label: "My Bids",  path: "/bids"      },
//   { icon: "doc",    label: "Passbook", path: "/passbook"  },
//   { icon: "home",   label: "Home",     path: "/home",  main: true },
//   { icon: "bank",   label: "Funds",    path: "/funds"     },
//   { icon: "chat",   label: "Support",  path: "/support"   },
// ];

// export default function BottomNav() {
//   const navigate  = useNavigate();
//   const { pathname } = useLocation();     // current URL – to highlight “active”

//   return (
//     <nav className="bottom-nav">
//       {navItems.map(({ icon, label, path, main }) => {
//         const isActive = pathname.startsWith(path);
//         return (
//           <button
//             key={label}
//             className={`nav-item ${isActive ? "active" : ""} ${main ? "main" : ""}`}
//             onClick={() => navigate(path)}
//           >
//             <span className={`icon-${icon}`} />
//             {/* Hide label under the yellow circle; show for others */}
//             {!main && <span>{label}</span>}
//           </button>
//         );
//       })}
//     </nav>
//   );
// }


import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"; 

// CAUTION: Replace this with your actual support phone number, including the country code.
//const WHATSAPP_SUPPORT_NUMBER = "919876543210"; // Example for an Indian number

/* Centralised nav config  */
const navItems = [
  { icon: "hammer", label: "My Bids",  path: "/bids"      },
  { icon: "doc",    label: "Passbook", path: "/passbook"  },
  { icon: "home",   label: "Home",     path: "/home",  main: true },
  { icon: "bank",   label: "Funds",    path: "/funds"     },
  { icon: "chat",   label: "Support",  path: "/support"   }, // Path is now just an identifier
];

export default function BottomNav({whatsappNumber} ) {
  const navigate   = useNavigate();
  const { pathname } = useLocation();    // current URL – to highlight “active”
    const { user } = useContext(AppContext);
    const visibleNavItems = user?.accountStatus === true
    ?navItems // If account is active, show all items
    : navItems.filter(item => item.label === "Home");
  return (
    <nav className="bottom-nav">
      {visibleNavItems.map(({ icon, label, path, main }) => {
        const isActive = pathname.startsWith(path);
        return (
          <button
            key={label}
            className={`nav-item ${isActive ? "active" : ""} ${main ? "main" : ""}`}
            // --- THIS is the only part that has changed ---
            onClick={() => {
              if (label === "Support") {
                // If the button is "Support", open the WhatsApp link
                window.open(`https://wa.me/${ whatsappNumber }`, '_blank', 'noopener,noreferrer');
              } else {
                // For all other buttons, navigate normally
                navigate(path);
              }
            }}
          >
            <span className={`icon-${icon}`} />
            {!main && <span>{label}</span>}
          </button>
        );
      })}
    </nav>
  );
}
