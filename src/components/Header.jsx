import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/App-Logo.png';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

  return (
    <header className="w-full fixed top-0 left-0 flex items-center justify-between p-4 bg-white text-gray-800 shadow-md z-50">
      <div className="flex items-center space-x-4 cursor-pointer"  onClick={() => navigate('/main')}>
        <img src={logo} alt="App Logo" className="w-12 h-auto" />
        <h1 className="text-4xl font-bold">WellFitGPT</h1>
      </div>
      <nav className="navbar-nav me-auto mb-lg-0 flex space-x-4 items-start ml-6 justify-between">
        <div className="flex space-x-4">
          <a href="/main" className="block w-32 px-4 py-4 ml-2 mt-1 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">Dashboard</a>
          <a href="/profile" className="block w-32 px-4 py-4 mt-1 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">Profile</a>
          <a href="/plan" className="block w-32 px-4 py-4 mt-1 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">Your Plans</a>
          <a href="/workouts" className="block w-32 px-4 py-4 mt-1 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">Workouts</a>
          <a href="/reports" className="block w-32 px-4 py-4 mt-1 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">Reports</a>
        </div>
      </nav>
      <button onClick={() => window.location.href = '/'} className="ml-auto bg-red-500 hover:bg-red-600 px-4 py-4 rounded-lg text-white">Log Out</button>
    </header>
  );
}

export default Header;