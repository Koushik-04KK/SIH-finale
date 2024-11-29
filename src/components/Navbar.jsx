import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import fanIcon from '../assets/fan.png';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const location = useLocation();

  // Determine navbar background based on the current route
  const isLandingPage = location.pathname === '/';
  const navbarBgClass = isLandingPage
    ? 'bg-customColor-landingbackground'
    : 'bg-customColor-otherpagesbackground';

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'RUL Prediction', path: '/rul-prediction' },
    { label: 'Schedules', path: '/schedules' },
    { label: 'ChatBot', path: '/chatbot' },
  ];

  return (
    <nav className={`top-0 z-50 py-3 px-5 ${navbarBgClass} h-16`}>
      <div className="container px-2 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <img
              src={fanIcon}
              alt="fan"
              href="/"
              className="w-12 h-12 mr-2 hover:cursor-pointer"
            />
          </div>

          {/* Desktop Navigation Items */}
          <ul className="hidden lg:flex ml-14 space-x-9">
            {navItems.map((item, index) => (
              <li key={index} className="transform transition-transform duration-300 hover:scale-105">
                <Link
                  to={item.path}
                  className="px-10 py-3 w-[200px] text-center font-raleway text-customColor-loginsubmitdark border-2 border-customColor-loginsubmitdark hover:bg-customColor-loginsubmitdark hover:text-white font-semibold text-[14px] 
                  bg-white rounded-3xl shadow-sm hover:shadow-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="transform transition-transform duration-300 hover:scale-105">
              <a
                onClick={onLogout}
                className="px-10 py-3 w-[200px] text-center text-base text-customColor-loginsubmitdark font-semibold rounded-3xl cursor-pointer"
              >
                Logout
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex text-customColor-loginsubmitdark  flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
  <div
    className="fixed top-0 right-0 z-20 bg-transparent backdrop-blur-lg w-full p-8 flex flex-col justify-between items-center lg:hidden"
    onClick={(e) => {
      // Prevents closing the navbar if clicked inside
      e.stopPropagation();
    }}
  >
    {/* Close Button */}
    <button
      className="absolute top-4 right-4 text-white text-2xl"
      onClick={() => setMobileDrawerOpen(false)}
    >
      <X size={24} /> {/* Use the X icon from lucide-react */}
    </button>

    <ul className="space-y-4 w-full flex flex-col items-center">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="flex justify-center items-center py-2 px-3 border-2 rounded-[20px]"
        >
          <Link to={item.path} className="text-white">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>

    {/* Centering the Logout button */}
    <div className="mt-auto flex justify-center items-center w-full">
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 mt-6 text-white py-2 px-3 rounded-md text-center"
      >
        Logout
      </button>
    </div>
  </div>
)}

{/* Close mobile menu if clicked outside */}
<div
  className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${mobileDrawerOpen ? '' : 'hidden'}`}
  onClick={() => setMobileDrawerOpen(false)} // Close navbar when clicked outside
/>
   
      </div>
    </nav>
  );
};

export default Navbar;
