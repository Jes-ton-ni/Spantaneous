// import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Nav from '../components/Nav';
import bg from '../assets/img/back.jpg';
import Footer from '../sections/Footer';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [services, setServices] = useState({
     'All': [],
    'Massage': [],
    'Facial': [],
    'Nail Treatment': [],
    'Body Treatment': []
  });

  useEffect(() => {
    // Fetch services from the server when the component mounts
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Make a GET request to fetch services from the server
      const response = await fetch('http://localhost:5000/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      // Parse the JSON response
      const data = await response.json();
      // Set the fetched services in the state
      setServices(data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Handle errors if necessary
    }
  };

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  const handleReserveClick = () => { // Onclick
    
    const isLoggedIn = false; 

    if (!isLoggedIn) {
      
      Swal.fire({
        icon: 'warning',
        title: 'Please log in first!',
        text: '',
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#21312d'
      });
    } 
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
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 0 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(0)}>All</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 1 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(1)}>Massage</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 2 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(2)}>Facial</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 3 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(3)}>Nail Treatment</Tab>
            <Tab className={`text-dark hover:text-light focus:outline-none focus:text-text-light font-medium text-lg py-4 px-6 cursor-pointer hover:bg-dark ${activeTab === 4 ? 'border-b-4 border-dark' : ''}`} onClick={() => handleTabSelect(4)}>Body Treatment</Tab>
          </TabList>

          {/* Render services dynamically based on active tab */}
          {Object.keys(services).map((category, index) => (
            <TabPanel key={index} className={`transition duration-300 ease-in-out ${activeTab === index ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold m-9 text-center">{category} Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services[category].map((service, serviceIndex) => (
                  <div key={serviceIndex} className="bg-white rounded-lg shadow-md p-6">
                    <img src={`http://localhost:5000/${service.image_path}`} alt={service.service_name} className="w-full h-[20rem] bg-gray-300 mb-4 rounded-lg bg-cover bg-center" />
                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-800">{service.description}</p>
                    <p className="text-gray-600 mt-2">Price: PHP {service.price}</p>
                    <button onClick={handleReserveClick} className="bg-dark hover:bg-light-dark text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out">Reserve</button>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </section>
      <section>
        <Footer />
      </section>
    </main>
    
  );
}
export default Services;
