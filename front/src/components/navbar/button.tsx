import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const DropdownButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const dropdownTimeoutRef = useRef<any>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const name = localStorage.getItem('name');
      setUserName(name);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    clearTimeout(dropdownTimeoutRef.current);

    if (!isDropdownOpen) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 3000);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="dropdown-container" onMouseLeave={handleMouseLeave}>
      <div
        className="dropdown-button"
        onMouseEnter={handleMouseEnter}
        onClick={toggleDropdown}
      >
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={`text-black bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:bg-orange-500 ${isDropdownOpen ? 'active' : ''}`}
          type="button"
        >
          {isLoggedIn ? `Hola, ${userName}` : 'ACCOUNT'}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
  <div
    id="dropdown"
    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
    onMouseEnter={handleMouseEnter}
  >
    <ul className="py-0 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      {!isLoggedIn && (
        <li>
          <button
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLoginClick}
            style={{ width: '100%' }}
          >
            Login
          </button>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLogoutClick}
            style={{ width: '100%' }}
          >
            Log out
          </button>
        </li>
      )}
    </ul>
  </div>
)}
    </div>
  );
};

export default DropdownButton;
