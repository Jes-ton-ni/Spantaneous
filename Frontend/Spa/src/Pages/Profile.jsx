import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../sections/Footer';
import bg from '../assets/img/back.jpg'; 

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [appointments, setUserAppointments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Function to check login status and user data
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-login', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        // Set isLoggedIn state
        setIsLoggedIn(data.isLoggedIn);
        // Set userData state
        if (data.isLoggedIn) {
          setUserData({
            firstName: data.user.Fname || '',
            lastName: data.user.Lname || '',
            username: data.user.username || '',
            email: data.user.email || '',
            contact: data.user.contact || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          });
        }
      } else {
        // If response is not ok, set isLoggedIn to false
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    toggleModal();
    setAlertMessage("You have successfully updated your profile!");
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Changing password...');
    console.log(formDauserDatata);
    setFormData({
      ...userData,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    togglePasswordModal();
    setAlertMessage("Password changed successfully!");
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  const handlePayment = (index) => {
    setShowPaymentModal(true);
    setSelectedAppointment(appointments[index]);
  };

  const [alertMessage, setAlertMessage] = useState("");

  // Define a function to fetch appointments from the server
  const fetchAppointments = async () => {
    try {
      // Make a GET request to the /appointments endpoint
      const response = await fetch('http://localhost:5000/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      // Update the bookings state with the fetched appointments
      setBookings(data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Call the fetchAppointments function when the component mounts
  useEffect(() => {
    fetchAppointments();
    return () => {
    };
  }, []);

  useEffect(() => {
    const appointment = bookings.filter(booking => booking.customer_id === 76 );
    setUserAppointments(appointment);
  }, [bookings]);

  return (
    <main>
      <section>
        <Nav />
      </section>

      <header className="mx-auto h-[20rem] flex justify-center items-center bg-center bg-cover border-b-8 border-dark" style={{backgroundImage: `url(${bg})`}}>
        <div className="">
          <h1 className='text-[6rem] text-dark font-extrabold font-palanquin text-center'>Profile</h1>
          <h1 className='text-center tracking-widest bg-dark p-2 text-light '><a className='mr-2 hover:text-light-dark transition-colors duration-200 hover:underline' href='/'><span>Home</span></a>/<span className='ml-2'>Profile</span></h1>
        </div>
      </header>
      
      <section className="px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="border-light-dark p-4 lg:p-8 bg-white border-2 rounded-lg shadow-md  ">
          {alertMessage && (
            <div className="mb-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg ">
              {alertMessage}
            </div>
          )}
          <h2 className="text-lg lg:text-4xl font-semibold mb-4">Welcome, {userData.firstName}!</h2>
          <div className="mb-4 space-y-2">
            <h2 className='text-2xl font-palanquin font-bold'>Profile Information:</h2>
            <p className="text-gray-700 text-sm lg:text-base"><span className="font-semibold">First Name:</span> {userData.firstName}</p>
            <p className="text-gray-700 text-sm lg:text-base"><span className="font-semibold">Last Name:</span> {userData.lastName}</p>
            <p className="text-gray-700 text-sm lg:text-base"><span className="font-semibold">Username:</span> {userData.username}</p>
            <p className="text-gray-700 text-sm lg:text-base"><span className="font-semibold">Email:</span> {userData.email}</p>
            <p className="text-gray-700 text-sm lg:text-base"><span className="font-semibold">Contact:</span> {userData.contact}</p>
            <button className="bg-dark hover:bg-light-dark text-white px-4 py-2 rounded-md mb-2 lg:mb-0 mr-0 lg:mr-2" onClick={toggleModal}>Update Profile</button>
          </div>
          <div className="mb-4 space-y-2">
            <h2 className='text-2xl font-palanquin font-bold'>Password and Security:</h2>
            <button className="bg-dark hover:bg-light-dark text-white px-4 py-2 rounded-md mb-2 lg:mb-0 mr-0 lg:mr-2" onClick={togglePasswordModal}>Change Password</button>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
          </div>
        </div>
        
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
            <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="modal-container bg-white w-full max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-semibold">Update Profile</p>
                  <button className="modal-close" onClick={toggleModal}>
                    <span className="text-3xl">&times;</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      defaultValue={userData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      defaultValue={userData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      defaultValue={userData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={userData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                      Contact
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="contact"
                      type="text"
                      name="contact"
                      placeholder="Contact"
                      defaultValue={userData.contact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
            <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="modal-container bg-white w-full max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-semibold">Change Password</p>
                  <button className="modal-close" onClick={togglePasswordModal}>
                    <span className="text-3xl">&times;</span>
                  </button>
                </div>
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="currentPassword"
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                      value={userData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={userData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="confirmNewPassword"
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                      value={userData.confirmNewPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                      onClick={togglePasswordModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center">
          <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="modal-container bg-white w-full max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-semibold">Payment Details</p>
                <button className="modal-close" onClick={togglePaymentModal}>
                  <span className="text-3xl">&times;</span>
                </button>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg w-full">
                  {/* Display selected appointment details */}
                  {selectedAppointment && (
                    <div>
                    <p className="text-gray-700 mb-2">Service: {selectedAppointment.name}</p>
                      <p className="text-gray-700 mb-2">Service: {selectedAppointment.service}</p>
                      <p className="text-gray-700 mb-2">Schedule: {new Date(selectedAppointment.date_appointed).toLocaleDateString()} {new Date(selectedAppointment.date_appointed).toLocaleTimeString()}</p>
                      <p className="text-gray-700 mb-2">Total: PHP{selectedAppointment.price_final}</p>
                    </div>
                  )}
                  <form onSubmit={handlePayment}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                        Choose Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option >-- Select Payment Method --</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="paymaya">PayMaya</option>
                        <option value="gcash">GCash</option>
                      </select>
                    </div>
              
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionRef">
                        Transaction Reference
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="transactionRef"
                        type="text"
                        name="transactionRef"
                        placeholder="Enter Transaction Reference"
                        required
                      />
                    </div>
                    {/* Additional form fields for payment details */}
                  </form>

                  <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Confirm Payment
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}


        {/* View Appointments Section */}
        <div className={`w-full  ${appointments.length > 2 ? 'overflow-y-auto h-[32rem]' : ''}`}>
          <div className="bg-dark p-4 lg:p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-white mb-4text-lg  mb-4 sticky top-0 bg-dark py-2 border-b-white border-b-2">View Appointments</h2>
            {appointments.map((appointment, index) => (
              <div className="border border-light-dark p-4 mb-4 rounded-lg shadow-md" key={index}>
                <h3 className="font-semibold text-lg text-white">{appointment.service}</h3>
                <p className="text-gray-300"><strong>Name:</strong> {appointment.name}</p>
                <p className="text-gray-300"><strong>Schedule:</strong> {new Date(appointment.date_appointed).toLocaleDateString()} {new Date(appointment.date_appointed).toLocaleTimeString()}</p>
                <p className="text-gray-300"><strong>Total:</strong> {appointment.price_final}</p>
                <p className="text-gray-300">
                  <strong>Status:</strong> {appointment.request_status === 1 ? 'Approved' : appointment.request_status === 2 ? 'Declined' : 'Pending'}
                </p>
                {appointment.request_status === 1 && appointment.payment_status === 0 && (
                  <button className="bg-green-500 text-white rounded px-2 py-1 mt-2" onClick={() => handlePayment(index)}>Pay</button>
                )}
                {appointment.payment_status === 1 && (
                  <p className="text-green-500 font-semibold mt-2">Paid</p>
                )}
                {index !== appointments.length - 1 && <hr className="border-gray-400 my-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Profile;
