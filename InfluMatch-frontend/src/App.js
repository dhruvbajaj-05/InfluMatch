import React from 'react';
import './global.css';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questionnaire />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}
export default App;
