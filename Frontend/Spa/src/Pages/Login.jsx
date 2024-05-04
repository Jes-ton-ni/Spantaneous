import React, { useEffect, useState } from 'react';
import Logo from '../assets/img/Logo.png';
import bg from '../assets/img/mt.jpg';
import swal from 'sweetalert';

const Login = () => {
  useEffect(() => {
    document.title = 'Login/Signup - Spa-ntaneous';
  }, []);

  const [activeTab, setActiveTab] = useState('login');
  const [identifier, setIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [showEmployeeRegistrationModal, setShowEmployeeRegistrationModal] = useState(false);
  const [pin, setPin] = useState('');
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [employeeSignupUsername, setEmployeeSignupUsername] = useState('');
  const [employeeSignupPassword, setEmployeeSignupPassword] = useState('');
  const [employeeSignupFirstName, setEmployeeSignupFirstName] = useState('');
  const [employeeSignupLastName, setEmployeeSignupLastName] = useState('');
  const [employeeSignupPhone, setEmployeeSignupPhone] = useState('');
  const [employeeSignupEmail, setEmployeeSignupEmail] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: identifier,
          password: loginPassword
        })
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        swal({
          title: 'Login Successful!',
          text: ' ',
          icon: 'success',
          buttons: false,
          timer: 1500,
        }).then(() => {
          window.location.href = '/';
        });
      }
      else{
        swal({
          title: 'Login Failed!',
          text: 'Invalid username or password',
          icon: 'error',
          buttons: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signupUsername,
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
          phone: signupPhone
        })
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        swal({
          title: 'Signup Successful!',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });
      }
      else{
        swal({
          title: 'Signup Failed!',
          text: data.error,
          icon: 'error',
          buttons: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };
  
  const handlePinSubmit = () => {
    if (pin === '1234') {
      setShowEmployeeForm(true);
      setShowEmployeeRegistrationModal(false);
    } else {
      alert('Invalid PIN. Please try again.');
    }
  };

  const handleEmployeeSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/employeesignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: employeeSignupUsername,
          firstName: employeeSignupFirstName,
          lastName: employeeSignupLastName,
          email: employeeSignupEmail,
          password: employeeSignupPassword,
          phone: employeeSignupPhone
        })
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        swal({
          title: 'Employee Signup Successful!',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });
      }
      else{
        swal({
          title: 'Employee Signup Failed!',
          text: data.error,
          icon: 'error',
          buttons: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up as an employee. Please try again later.');
    }
  };

  return (
    <main>
      <section className="flex justify-center items-center min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${bg})` }}>
          <div className="w-full max-w-lg ">
            <a href="/" className="mb-8 flex justify-center m-[5rem]">
              <img className=' rounded-xl' src={Logo} alt="Logo" width={250} />
            </a>
            <div className="flex mb-4">
              <button
                className={`w-1/2 py-2 px-4 ${activeTab === 'login' ? 'bg-dark text-white' : 'bg-light text-gray-700'}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-2 px-4 ${activeTab === 'signup' ? 'bg-light-dark text-white' : 'bg-light text-gray-700'}`}
                onClick={() => setActiveTab('signup')}
              >
                Signup
              </button>
            </div>
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="bg-light shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl mb-4 font-bold">Login</h2>
                <div className="mb-4">
                  <label htmlFor="login-identifier" className="block text-gray-700 text-sm font-bold mb-2">Username or Email:</label>
                  <input
                    type="text"
                    id="login-identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="login-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input
                    type="password"
                    id="login-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-dark  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-light-dark duration-500">
                    Login
                  </button>
                </div>
              </form>
            )}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="bg-light shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <h2 className="text-xl mb-4 font-bold">Signup</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="signup-firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                    <input
                      type="text"
                      id="signup-firstname"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="signup-lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input
                      type="text"
                      id="signup-lastname"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-Username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                  <input
                    type="text"
                    id="signup-username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                  <input
                    type="tel"
                    id="signup-phone"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-dark  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-light-dark duration-500">
                    Signup
                  </button>
                  <a className='  text-end text-sm text-light-dark hover:text-dark duration-200'  href='#' onClick={() => setShowEmployeeRegistrationModal(true)}>Register as Employee</a>
                </div>
              </form>
            )}
            
            {/* Employee Registration Modal */}
            {showEmployeeRegistrationModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  <div className="relative bg-white rounded-lg max-w-md p-8">
                    <div className="absolute top-0 right-0 cursor-pointer" onClick={() => setShowEmployeeRegistrationModal(false)}>
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Enter PIN</h2>
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                      placeholder="Enter PIN"
                    />
                    <button onClick={handlePinSubmit} className="bg-dark duration-300 text-white font-bold px-4 py-2 rounded hover:bg-light-dark">Submit</button>
                  </div>
                </div>
              </div>
            )}
            {/* Employee Signup Modal */}
            {showEmployeeForm && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  <div className="relative bg-white rounded-lg max-w-md p-8">
                    <div className="absolute top-0 right-0 cursor-pointer" onClick={() => setShowEmployeeForm(false)}>
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Employee Signup Form</h2>
                    <form onSubmit={handleEmployeeSignupSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                          <label htmlFor="employee-signup-firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                          <input
                            type="text"
                            id="employee-signup-firstname"
                            value={employeeSignupFirstName}
                            onChange={(e) => setEmployeeSignupFirstName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="employee-signup-lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                          <input
                            type="text"
                            id="employee-signup-lastname"
                            value={employeeSignupLastName}
                            onChange={(e) => setEmployeeSignupLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="employee-signup-Username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                          type="text"
                          id="employee-signup-username"
                          value={employeeSignupUsername}
                          onChange={(e) => setEmployeeSignupUsername(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="employee-signup-email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
                        <input
                          type="email"
                          id="employee-signup-email"
                          value={employeeSignupEmail}
                          onChange={(e) => setEmployeeSignupEmail(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="employee-signup-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                          type="password"
                          id="employee-signup-password"
                          value={employeeSignupPassword}
                          onChange={(e) => setEmployeeSignupPassword(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="employee-signup-phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input
                          type="tel"
                          id="employee-signup-phone"
                          value={employeeSignupPhone}
                          onChange={(e) => setEmployeeSignupPhone(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <button type="submit" className="bg-dark  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-light-dark duration-500">
                          Signup
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
      </section>
    </main>
  );
};

export default Login;
