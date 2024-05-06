import { useEffect, useState } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi'; 
import { animateScroll as scroll } from 'react-scroll'; 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Nav from '../components/Nav';
import bg from '../assets/img/back.jpg';
import Footer from '../sections/Footer';

import pic1 from '../assets/img/swedish.png';
import pic2 from '../assets/img/deep.jpg';
import pic3 from '../assets/img/hotstone.jpg';
import pic4 from '../assets/img/classic.jpg';
import pic5 from '../assets/img/anti.jpg';
import pic6 from '../assets/img/hydra.jpg';
import pic7 from '../assets/img/mani.jpg';
import pic8 from '../assets/img/pedi.jpg';
import pic9 from '../assets/img/gel.jpg';
import pic10 from '../assets/img/scrub.jpg';
import pic11 from '../assets/img/wrap.jpg';
import pic12 from '../assets/img/aroma.jpg';


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



const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({ name: '', price: 0 });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const [massageServices] = useState([
    { image: pic1, name: 'Swedish Massage', description: 'Enjoy a relaxing Swedish massage to relieve stress and tension in your muscles.', price: 900 },
    { image: pic2, name: 'Deep Tissue Massage', description: 'Experience the therapeutic benefits of a deep tissue massage, targeting deeper layers of muscles and connective tissue.', price: 1000 },
    { image: pic3, name: 'Hot Stone Massage', description: 'Indulge in the soothing warmth of hot stones combined with massage techniques to relax muscles and improve circulation.', price: 1500 }
  ]);

  const [facialServices] = useState([
    { image: pic4, name: 'Classic Facial', description: 'Revitalize your skin with our classic facial, including cleansing, exfoliation, and hydration to leave your skin feeling refreshed.', price: 950 },
    { image: pic5, name: 'Anti-Aging Facial', description: 'Combat the signs of aging with our anti-aging facial, featuring specialized treatments to reduce wrinkles and improve skin elasticity.', price: 1200 },
    { image: pic6, name: 'Hydrating Facial', description: 'Restore moisture to dry skin with our hydrating facial, designed to nourish and replenish your skin for a healthy glow.', price: 1300 }
  ]);

  const [nailTreatmentServices] = useState([
    { image: pic7, name: 'Manicure', description: 'Treat your hands to a manicure, including nail shaping, cuticle care, and polish application for beautifully groomed nails.', price: 450 },
    { image: pic8, name: 'Pedicure', description: 'Pamper your feet with a pedicure, featuring nail trimming, callus removal, and a relaxing foot massage to rejuvenate tired feet.', price: 300 },
    { image: pic9, name: 'Gel Nail Extension', description: 'Get long-lasting color and shine with gel nails, perfect for chip-free manicures and pedicures that last up to two weeks.', price: 675 }
  ]);

  const [bodyTreatmentServices] = useState([
    { image: pic10, name: 'Body Scrub', description: 'Exfoliate and renew your skin with a body scrub, removing dead skin cells to reveal smoother, softer skin.', price: 1299 },
    { image: pic11, name: 'Body Wrap', description: 'Detoxify and hydrate your skin with a body wrap, promoting relaxation and improving skin tone and texture.', price: 1450 },
    { image: pic12, name: 'Aromatherapy', description: 'Experience the therapeutic benefits of aromatherapy, using essential oils to enhance your massage or body treatment.', price: 999 }
  ]);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <main>
      <section>
        <Nav />
      </section>

      <header className="mx-auto h-[20rem] flex justify-center items-center bg-center bg-cover border-b-8 border-dark" style={{ backgroundImage: `url(${bg})` }}>
        <div>
          <h1 className='text-[6rem] text-dark font-extrabold font-palanquin text-center'>Services</h1>
          <h1 className='text-center tracking-widest bg-dark p-2 text-light '><a className='mr-2 hover:text-light-dark transition-colors duration-200 hover:underline' href='/'><span>Home</span></a>/<span className='ml-2'>Services</span></h1>
        </div>
      </header>

      <section className='bg-light-dark/10' >
        <Tabs
          className="mx-auto max-w-7xl px-4 py-8"
          selectedIndex={activeTab}
          onSelect={handleTabSelect}
        >
          <TabList className="flex justify-center mb-8 flex-wrap sm:flex-nowrap gap-9">
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 0 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(0)}>Massage</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 1 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(1)}>Facial</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 2 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(2)}>Nail Treatment</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 3 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(3)}>Body Treatment</Tab>
          </TabList>

          <TabPanel className={`transition duration-300 ease-in-out ${activeTab === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold m-9 text-center">Massage Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {massageServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-full h-[20rem] bg-gray-300 mb-4 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-800">{service.description}</p>
                  <p className="text-gray-600 mt-2">Price: PHP {service.price}</p>
                  <button className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out" onClick={() => { handleServiceSelect(service); toggleModal(); }}>Reserve</button>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel className={`transition duration-300 ease-in-out ${activeTab === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold m-9 text-center">Facial Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facialServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-full h-[20rem] bg-gray-300 mb-4 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-800">{service.description}</p>
                  <p className="text-gray-600 mt-2">Price: PHP {service.price}</p>
                  <button className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out" onClick={() => { handleServiceSelect(service); toggleModal(); }}>Reserve</button>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel className={`transition duration-300 ease-in-out ${activeTab === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold m-9 text-center">Nail Treatment Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nailTreatmentServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-full h-[20rem] bg-gray-300 mb-4 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-800">{service.description}</p>
                  <p className="text-gray-600 mt-2">Price: PHP {service.price}</p>
                  <button className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out" onClick={() => { handleServiceSelect(service); toggleModal(); }}>Reserve</button>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel className={`transition duration-300 ease-in-out ${activeTab === 3 ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold m-9 text-center">Body Treatment Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bodyTreatmentServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-full h-[20rem] bg-gray-300 mb-4 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-800">{service.description}</p>
                  <p className="text-gray-600 mt-2">Price: PHP {service.price}</p>
                  <button className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out" onClick={() => { handleServiceSelect(service); toggleModal(); }}>Reserve</button>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-light p-8 rounded-lg overflow-auto">
            <h2 className="text-3xl  mb-6 text-center font-palanquin font-semibold">Reservation Form</h2>
            <form className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-dark">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-dark">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-dark">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-dark">Date</label>
                  <input type="date" id="date" name="date" className="mt-1  block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="service" className="block text-sm font-medium text-dark">Service</label>
                  <input type="text" id="service" name="service" value={selectedService.name} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-dark">Price</label>
                  <input type="text" id="price" name="price" value={`PHP ${selectedService.price}`} readOnly className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="block text-sm font-medium text-dark">Time</label>
                  <input type="time" id="time" name="time" className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2" />
                </div>
              </div>
              <div className="col-span-2 mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-dark">Message</label>
                <textarea id="message" name="message" rows="3" className="mt-1  block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md  p-2"></textarea>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Reserve Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      <section>
        <Footer />
      </section>

      <ScrollToTopButton/>
    </main>
  );
}

export default Services;
