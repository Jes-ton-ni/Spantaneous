import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Logo from '../assets/img/Logo.png'; 
import HamburgerIcon from '../assets/icons/hamburger.svg';
import User from '../assets/img/user.png';
import close from '../assets/icons/close.svg';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const navRef = useRef();
  const location = useLocation(); // Get current location pathname
  
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
        </ul>
        
        <div className='text-light max-xl:hidden justify-center flex items-center gap-9 ml-16'>
          <a href="/login"> 
            <img className='hover:bg-slate-200 rounded-3xl duration-500' src={User} alt="user" width={35}/>
          </a>

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
          <nav className="bg-dark text-white py-4  xl:hidden flex flex-wrap justify-center items-center rounded-3xl ">
            <ul className="flex gap-9 flex-wrap max-sm:flex-col text-center justify-center items-center">
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
              <li className=" bg-white text-black size-9 rounded-3xl hover:bg-slate-200  duration-500">
                <a href="/login"><img src={User}/> </a>
              </li>
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
