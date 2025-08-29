import React , {useEffect} from 'react';
import '../css/SplashScreen.css';
import splashIMG from '../assets/images/yess.png'
import { useNavigate } from 'react-router-dom';
import "../css/mainhome.css"

const SplashScreen = () => {
  const navigate = useNavigate();
  //735017

   useEffect(() => {
       // Check if the user has logged in before
       const accessToken = localStorage.getItem('accessToken');
       const registerId = localStorage.getItem('registerId');
   
       // If tokens exist, the user is returning, so redirect to the MPIN screen
       if (accessToken && registerId) {
          const timer = setTimeout(() => {
      navigate('/login-with-mpin', { replace: true });
    }, 2000);
      return () => clearTimeout(timer);
       }
     }, [navigate]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/enter-mobile');
    }, 2500); // 2 seconds delay
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mainhome-screen-wrapper">
    {/* <div className="splash-screen"> */}
      <img src={splashIMG} alt="Splash" className="splash-image" />
    </div>
    // </div>
  );
};


export default SplashScreen;
