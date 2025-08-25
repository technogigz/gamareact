import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; // 1. Import our custom hook

export default function PrivateRoute({ children }) {
  // 2. Get the user and loading state from our global context
  const { user, loading } = useAppContext();
  
  // 3. While the context is doing its initial check for a user, show a loading screen.
  // This is the most important step. It pauses rendering until the app knows
  // for sure whether a user is logged in or not.
  if (loading) {
    return (
      <div className="mainhome-screen-wrapper">
        <div style={{ margin: 'auto', color: '#333' }}>Loading...</div>
      </div>
    );
  }

  // 4. After the check is complete, if there IS a user object, show the protected page.
  if (user) {
    return children;
  }

  // 5. If the check is complete and there is NO user, redirect to the login screen.
  return <Navigate to="/enter-mobile" replace />;
}
