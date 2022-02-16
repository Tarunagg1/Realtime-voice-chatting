import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authennticate';
import Activate from './pages/Activate/Activate';
import Room from './pages/Room/Room';
import { ToastContainer } from 'react-toastify';
import {useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Fragment>
      <ToastContainer />
      
      <Navigation />
      <Routes>
        <Route path="/" element={<GuestRoute> <Home /> </GuestRoute>} />
    
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        
        <Route path="/activate"element={<SemiProtected><Activate /></SemiProtected>} />

        <Route path="/rooms" element={<ProtectedRoute> <Room /> </ProtectedRoute>} />

        
      </Routes>
    </Fragment>
  );
}



const GuestRoute = ({children}) => {  
  const {isAuth} = useSelector(state => state.auth);
  return isAuth ?  <Navigate to="/rooms" /> : children;
};

const SemiProtected = ({children}) => {
  const {isAuth, user} = useSelector(state => state.auth);

  if(!isAuth) {
    return <Navigate to="/" />
  }

  if(isAuth && !user.activated) {
    return children
  }else{
    return <Navigate to="/rooms" />
  }
};

const ProtectedRoute = ({children}) => {
  const {isAuth, user} = useSelector(state => state.auth);

  if(!isAuth) {
    return <Navigate to="/" />
  }
  if(isAuth && !user.activated) {
    return <Navigate to="/activate" />
  }else{
    return children;
  }
};


export default App;
