import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import ProfilePage from './components/ProfilePage';
import PlansPage from './components/PlansPage';
import WorkoutsPage from './components/WorkoutsPage';
import ReportPage from './components/ReportPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/plan" element={<PlansPage />}  />
          <Route path="/workouts" element={<WorkoutsPage />}  />
          <Route path="/reports" element={<ReportPage />}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
