import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import DropdownButton from '../navbar/button';
import Project from './Project';
import Home from './Home';
import Players from './Players';
import Contact from './Contact';
import Register from './Register';
import PlayerInfo from '../player/PlayerInfo';
import Favorite from './Favorite';
import Login from './Login';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let Links = [
    { name: 'HOME', link: '/Home' },
    { name: 'GAMES', link: '/Project' },
    { name: 'PLAYERS', link: '/Players' },
    { name: 'CONTACT', link: '/Contact' },
  ];

  if (isLoggedIn) {
    Links.push({ name: 'FAVORITES', link: '/Favorite' });
  }

  const renderComponent = (Component) => {
    if (isLoggedIn) {
      return <Component />;
    } else {
      return <Navigate to="/Login" />;
    }
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Router>
      <div className="navbar shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 navbar-content">
          <div className="font-bold text-4xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-4xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="basketball"></ion-icon>
            </span>
            NBeT
          </div>

          <ul className="md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in top-20">
            {Links.map((link) => (
              <li key={link.name} className="md:ml-6 text-xl md:my-0 my-7">
                <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-500">
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="md:ml-6 text-xl md:my-0 my-7">
              <DropdownButton />
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-28">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/Players" element={<Players />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Favorite" element={renderComponent(() => <Favorite />)} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Player-info/:playerName" element={<PlayerInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
