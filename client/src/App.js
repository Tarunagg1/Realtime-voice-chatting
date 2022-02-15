import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
