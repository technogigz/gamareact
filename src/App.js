import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import SplashScreen from './screens/SplashScreen';
import MobileEntry from './screens/MobileEntry';
import OtpVerify from './screens/OtpVerify';
import CreateAccount from './screens/CreateAccount';
import SetPin from './screens/SetPin'
import MainHome from './screens/MainHome';
import FundsScreen from './screens/FundsScreen';
import MyBidsScreen from './screens/MyBidsScreen';
import PassbookScreen from './screens/PassbookScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupportScreen from './screens/SupportScreen';
import SetNewPinScreen from './screens/SetNewPin';
import NotificationsScreen from './screens/NotificationScreen';
import Videos from './screens/Videos';
import NoticeRules from './screens/NoticeRules'
import GameRatesScreen from './screens/GameRates';
import ChartsScreen from './screens/Chart';
import SubmitIdeaScreen from './screens/SubmitIdeas';
import SettingsScreen from './screens/Settings';
import ShareApp from './screens/Share';
import ChartDetail from './screens/chartDetail';
import AddFundScreen from './screens/AddFunds';
import WithdrawFundsScreen from "./screens/WithdrawFunds";
import AddBankDetailsScreen from "./screens/AddBankDetails";
import DepositHistoryScreen from "./screens/DepositHistory";
import WithdrawHistoryScreen from './screens/WithdrawHistory';
import KingJackpotScreen from './screens/KingJackpot';
import KingStarlineDashboard from './screens/KingStarline';
import KingJackpotResultHistory from './screens/ResultHistoryJackpot';
import KingStarlineResultHistory from './screens/ResultHistoryStarline';
import LoginWithMPin from './screens/LoginWithMpin';
import PrivateRoute from './components/PrivateRoute';
import OpenGame from './screens/OpenGame';
import BidHistoryScreen from './screens/BidHistory';
import SBidHistory from './screens/StarlineHistory';
import JBidHistory from './screens/JackpotHistory';
import  StarlineGames from './screens/StarlineGames';
import JackpotGames from './screens/JackpotGame'




import BidGames from './games/BidGames';

function App() {
  return (
      <Router>
      <div className="appp-wrapper">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/enter-mobile" element={<MobileEntry />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/set-pin" element={<SetPin />} />
       

         <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainHome />
            </PrivateRoute>
          }
          
        />

        <Route path="/funds" element={<PrivateRoute><FundsScreen /> </PrivateRoute>} />
        <Route path="/bids" element={<PrivateRoute><MyBidsScreen /></PrivateRoute>} />
        <Route path="/passbook" element={<PassbookScreen />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/set-new-pin" element={<SetNewPinScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/rules" element={<NoticeRules />} />
        <Route path="/rates" element={<GameRatesScreen />} />
        <Route path="/charts" element={<ChartsScreen/>} />
        <Route path="/submit-idea" element={<SubmitIdeaScreen/>} />
        <Route path="/share" element={<ShareApp/>} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/charts/:gameId/:chartName" element={<ChartDetail />} />
        <Route path="/funds/add" element={<AddFundScreen />} />
        <Route path="/funds/withdraw" element={<PrivateRoute><WithdrawFundsScreen /></PrivateRoute>} />
        <Route path="/funds/addBankDetails" element={<AddBankDetailsScreen />} />
        <Route path="/funds/depositHistory" element={<DepositHistoryScreen />} />
        <Route path="/funds/WithdrawHistory" element={<WithdrawHistoryScreen />} />
        <Route path="/king-jackpot" element={<PrivateRoute><KingJackpotScreen/></PrivateRoute>} />
        <Route path="/king-starline" element={<PrivateRoute><KingStarlineDashboard/></PrivateRoute>} />
     
        <Route path="/login-with-mpin" element={<LoginWithMPin/>} />
        <Route path="/market/:marketId" element={<OpenGame />} />
        <Route path='/bid-history' element={<BidHistoryScreen/>}/>
        <Route path='/starline-bid-history' element={<SBidHistory/>}/>
        <Route path='/jackpot-bid-history' element={<JBidHistory/>}/>
            
          {/* GAMESSSS */}

         <Route path="/bid/:marketType/:marketId/:gameType" element={<PrivateRoute><BidGames /></PrivateRoute>} />

         <Route path="/starline/:marketId" element={<StarlineGames />} />
          <Route path="/jackpot/:marketId" element={<JackpotGames />} />


        <Route path="/bids/jackpot-result-history" element={<KingJackpotResultHistory/>} />
        <Route path="/bids/starline-result-history" element={<KingStarlineResultHistory/>} />


      </Routes>
       <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
