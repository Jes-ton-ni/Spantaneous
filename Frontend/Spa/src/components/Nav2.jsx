import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Logo from '../assets/img/Logo.png'; 
import HamburgerIcon from '../assets/icons/hamburger.svg';
import User from '../assets/img/user.png';
import close from '../assets/icons/close.svg';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const navRef = useRef();
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    // Update activeLink when location changes
    setActiveLink(location.pathname);
  }, [location]);

  const showNavbar = () => {
    setIsOpen(!isOpen);
  }

  const closeNavbar = () => {
    setIsOpen(false);
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };
   

  //sample username
  const username = "Alepse";

  return (
    <header className='px-4 w-full padding-x'>
      <nav ref={navRef} className={`flex gap-16 justify-center items-center ${isOpen ? 'responsive_nav' : ''}`}>
        <a href="/" className="mr-16 relative"> 
          <img src={Logo} alt="Logo" width={300} /> 
        </a>

        <ul className="flex items-center gap-12 font-medium text-base max-xl:hidden" onClick={closeNavbar}>
          <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/' ? 'underline' : ''}`}>
            <a href="/">Home</a>
          </li>
          <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/about' ? 'underline' : ''}`}>
            <a href="/about">About</a>
          </li>
          <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/services' ? 'underline' : ''}`}>
            <a href="/services">Services</a>
          </li>
          <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/contact' ? 'underline' : ''}`}>
            <a href="/contact">Contact</a>
          </li>
          <li className="hover:text-light-dark transition-colors duration-200 hover:underline">
            <a href="/admin">Admin</a>
          </li>
          <li className="hover:text-light-dark transition-colors duration-200 hover:underline">
            <a href="/employee">Employee</a>
          </li>
        </ul>
        
        <div className='text-light max-xl:hidden justify-center flex items-center gap-9 ml-16'>
          {/* Dropdown for user profile */}
          <div className="relative" onClick={toggleDropdown}>
            <div className="flex items-center justify-center hover:bg-gray-300 duration-500 text-dark text-xs font-semibold cursor-pointer px-3 py-2 rounded-md">
              <img src={User} alt="User Profile" className="w-6 h-6 mr-2" />
              <span>{username}</span>
            </div>
            {/* Dropdown content */}
            {showDropdown && (
              <div className="absolute bg-white right-0 mt-2 rounded-md shadow-lg z-20">
                <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
              </div>
            )}
          </div>
          {/* Reserve Now button */}
          <a href="/booking">
            <button className='rounded-r-full bg-dark text-light p-2 hover:bg-light-dark duration-500 text-sm'>Reserve Now ➣</button>
          </a>
        </div>

        <div className="xl:hidden block">
          <button onClick={showNavbar}> <img src={isOpen ? close : HamburgerIcon} alt={isOpen ? "Close" : "Hamburger"} width={25} height={25}/></button>
        </div>
      </nav>
      
      {isOpen && (
        <div className=' xl:hidden block m-9'>
          <nav className="bg-dark text-white py-4 xl:hidden flex flex-wrap justify-center items-center rounded-3xl">
            <ul className="flex gap-9 flex-wrap max-sm:flex-col text-center justify-center items-center">
              <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/' ? 'underline' : ''}`}>
                <a href="/" onClick={() => setActiveLink('/')}>Home</a>
              </li>
              <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/about' ? 'underline' : ''}`}>
                <a href="/about" onClick={() => setActiveLink('/about')}>About</a>
              </li>
              <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/services' ? 'underline' : ''}`}>
                <a href="/services" onClick={() => setActiveLink('/services')}>Services</a>
              </li>
              <li className={`hover:text-light-dark transition-colors duration-200 ${activeLink === '/contact' ? 'underline' : ''}`}>
                <a href="/contact" onClick={() => setActiveLink('/contact')}>Contact</a>
              </li>
              <div className="relative" onClick={toggleDropdown}>
                <div className="flex items-center justify-center bg-light hover:bg-gray-300 duration-500 text-dark text-xs font-semibold cursor-pointer px-3 py-2 rounded-md">
                  <img src={User} alt="User Profile" className="w-6 h-6 mr-2" />
                  <span>{username}</span>
                </div>
                {/* Dropdown content */}
                {showDropdown && (
                  <div className="absolute bg-white right-0 mt-2 rounded-md shadow-lg z-20">
                    <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                    <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
                  </div>
                )}
              </div>
              <li className=" bg-white text-black p-2 rounded-full hover:bg-light-dark duration-500 hover:text-light m-2">
                <a href="/booking">Reserve now</a>
              </li>  
            </ul> 
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;
