import { useEffect, useState } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi'; 
import { animateScroll as scroll } from 'react-scroll'; 
import Nav from '../components/Nav';
import Footer from '../sections/Footer';
import bg from '../assets/img/back.jpg';
import logo from '../assets/img/Logo.png';
import back from '../assets/img/white.jpg';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500, 
    });
  };

  return (
    <button
    className={`fixed right-4 bottom-12 z-50 bg-dark hover:bg-light-dark text-white rounded-xl p-3 ${isVisible ? 'opacity-100 transition-opacity duration-300 animate-bounce' : 'opacity-0 transition-opacity duration-300'}`}
    onClick={scrollToTop}
  >
    <HiOutlineArrowUp className="w-5 h-12" />
  </button>
  
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    phone: '',
    message: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-login', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON
        // Check the value of isLoggedIn
        setIsLoggedIn(data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      // Handle error, e.g., show an error message to the user
    }
  };  

  useEffect(() => {
    // Call the function to check login status when the component mounts
    checkLoginStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    document.title = 'Booking - Spa-ntaneous';
  }, []);

  return (
    <main>
      <section>
        <Nav />
      </section>

      <header className="h-[20rem] flex flex-col justify-center items-center bg-center bg-cover border-b-8 border-dark" style={{ backgroundImage: `url(${bg})` }}>
        <div>
          <h1 className='text-[6rem] text-dark font-extrabold font-palanquin text-center'>Book with US</h1>
          <p className='text-center tracking-widest bg-dark p-2 text-light'>
            <a className='mr-2 hover:text-light-dark transition-colors duration-200 hover:underline' href='/'>
              <span>Home</span>
            </a>/
            <span className='ml-2'>Booking</span>
          </p>
        </div>
      </header>

      <section className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
        <div className="max-w-[50rem] bg-white p-9 rounded-lg shadow-lg">
          <img src={logo} alt="Logo" className="mx-auto" />
          <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">-- Select a service --</option>
                <optgroup label="Massage">
                  <option value="Swedish Massage">Swedish Massage</option>
                  <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                  <option value="Hot Stone Massage">Hot Stone Massage</option>
                </optgroup>
                <optgroup label="Facial">
                  <option value="Classic Facial">Classic Facial</option>
                  <option value="Anti-Aging Facial">Anti-Aging Facial</option>
                  <option value="Hydrating Facial">Hydrating Facial</option>
                </optgroup>
                <optgroup label="Nail Treatment">
                  <option value="Manicure">Manicure</option>
                  <option value="Pedicure">Pedicure</option>
                  <option value="Gel Nail Extension">Gel Nail Extension</option>
                </optgroup>
                <optgroup label="Body Treatment">
                  <option value="Body Scrub">Body Scrub</option>
                  <option value="Body Wrap">Body Wrap</option>
                  <option value="Aromatherapy">Aromatherapy</option>
                </optgroup>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              ></textarea>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <Footer />
      </section>
      <ScrollToTopButton />
    </main>
  );
};

export default Booking;
