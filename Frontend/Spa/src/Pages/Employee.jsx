import React, { useState, useEffect} from 'react';
import { FaUserAlt, FaCalendarAlt, FaTasks } from 'react-icons/fa';
import Logo from '../assets/img/Logo.png';

const Employee = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can implement logic to update employee information
      console.log('Form submitted:', { name, email, phone, address });
    };
  
    return (
      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-dark">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-9 p-2">
          <div >
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-smsm:text-sm p-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm p-2"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm resize-none h-24"
              placeholder="Enter your address"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark hover:bg-light-dark "
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  };
  

  const Appointment = () => {
    const appointments = [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        service: 'Swedish Massage',
        date: '2024-04-25',
        time: '10:00 AM',
        message: 'I would like to request a male therapist.'
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '987-654-3210',
        service: 'Deep Tissue Massage',
        date: '2024-04-27',
        time: '2:00 PM',
        message: 'No specific requests.'
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '987-654-3210',
        service: 'Deep Tissue Massage',
        date: '2024-04-27',
        time: '2:00 PM',
        message: 'No specific requests.'
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '987-654-3210',
        service: 'Deep Tissue Massage',
        date: '2024-04-27',
        time: '2:00 PM',
        message: 'No specific requests.'
      },
    ];
  
    return (
      <div className='container mx-auto'>
        <h2 className='text-4xl font-semibold text-center mb-9'>Appointments</h2>
        <div className='flex items-center justify-center'>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {appointments.map((appointment, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md bg-light">
                <h3 className="text-lg font-bold mb-2">Appointment {index + 1}</h3>
                <p><span className="font-medium">Name:</span> {appointment.name}</p>
                <p><span className="font-medium">Email:</span> {appointment.email}</p>
                <p><span className="font-medium">Phone:</span> {appointment.phone}</p>
                <p><span className="font-medium">Service:</span> {appointment.service}</p>
                <p><span className="font-medium">Date:</span> {appointment.date}</p>
                <p><span className="font-medium">Time:</span> {appointment.time}</p>
                <p><span className="font-medium">Message:</span> {appointment.message}</p>
                <div className=' flex gap-4 '> 
                <button className="mt-4 px-4 py-2 bg-dark text-white rounded-md hover:bg-dark/90 duration-300 ">
                  Accept
                </button>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-300 text-end ">
                  Decline
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  
  const Tasks = () => {
    const [pendingTasks, setPendingTasks] = useState([
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        service: 'Swedish Massage',
        date: '2024-04-25',
        time: '10:00 AM',
        message: 'I would like to request a male therapist.',
        paid: false,
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phone: '987-654-3210',
        service: 'Deep Tissue Massage',
        date: '2024-04-26',
        time: '2:00 PM',
        message: 'No specific instructions.',
        paid: false,
      },
    ]);
  
    const [completedTasks, setCompletedTasks] = useState([]);
    const [completedFilter, setCompletedFilter] = useState({
      date: '',
      time: '',
    });
    const [completedDates, setCompletedDates] = useState([]);
    const [completedTimes, setCompletedTimes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
  
    useEffect(() => {
      const dates = [...new Set(completedTasks.map(task => task.date))];
      const times = [...new Set(completedTasks.map(task => task.time))];
      setCompletedDates(dates);
      setCompletedTimes(times);
    }, [completedTasks]);
  
    const handleCompletedFilterChange = (e) => {
      const { name, value } = e.target;
      setCompletedFilter(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const filteredCompletedTasks = completedTasks.filter(task => {
      const isDateMatch = !completedFilter.date || task.date === completedFilter.date;
      const isTimeMatch = !completedFilter.time || task.time === completedFilter.time;
      return isDateMatch && isTimeMatch;
    });
  
    const markAsCompleted = (taskId) => {
      const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const completedTask = { ...pendingTasks[taskIndex], paid: false, paymentMethod: '' };
        setCompletedTasks(prevState => [...prevState, completedTask]);
        setPendingTasks(prevState => prevState.filter(task => task.id !== taskId));
      }
    };
  
    const toggleModal = (taskId) => {
      setShowModal(!showModal);
      setSelectedTaskId(taskId);
      const task = completedTasks.find(task => task.id === taskId);
      if (task) {
        setPaymentMethod(task.paymentMethod || '');
      }
    };
  
    const handlePaymentMethodChange = (e) => {
      setPaymentMethod(e.target.value);
    };
  
    const markAsPaid = () => {
      const updatedCompletedTasks = completedTasks.map(task => {
        if (task.id === selectedTaskId) {
          return { ...task, paid: true, paymentMethod: paymentMethod };
        }
        return task;
      });
      setCompletedTasks(updatedCompletedTasks);
      setShowModal(false);
    };
  
    return (
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Task Management</h2>
  
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Pending Tasks</h3>
          {pendingTasks.map(task => (
            <div key={task.id} className="bg-white shadow-md rounded-md p-6 mb-4">
              <p className="text-lg font-semibold">{task.name}</p>
              <p className="text-gray-600">{task.service}</p>
              <p>{task.date}, {task.time}</p>
              <button
                onClick={() => markAsCompleted(task.id)}
                className="px-4 py-2 mt-4 rounded-md text-white bg-dark hover:bg-dark/90 duration-300"
              >
                Mark as Completed
              </button>
            </div>
          ))}
        </div>
  
        <div>
          <h3 className="text-xl font-semibold mb-4">Completed Tasks</h3>
          <div className="flex items-center mb-4">
            <label className="mr-2">Filter by Date:</label>
            <select
              name="date"
              value={completedFilter.date}
              onChange={handleCompletedFilterChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Dates</option>
              {completedDates.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>
            <label className="ml-4 mr-2">Filter by Time:</label>
            <select
              name="time"
              value={completedFilter.time}
              onChange={handleCompletedFilterChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Times</option>
              {completedTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>
          {filteredCompletedTasks.map(task => (
            <div key={task.id} className="bg-white shadow-md rounded-md p-6 mb-4">
              <p className="text-lg font-semibold">{task.name}</p>
              <p className="text-gray-600">{task.service}</p>
              <p>{task.date}, {task.time}</p>
              {task.paid ? (
                <div>
                  <p>Paid via {task.paymentMethod}</p>
                </div>
              ) : (
                <button onClick={() => toggleModal(task.id)} className="px-4 py-2 mt-4 rounded-md text-white bg-dark hover:bg-dark/90 duration-300">
                  Paid
                </button>
              )}
            </div>
          ))}
        </div>
  
        {showModal && selectedTaskId && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                        Select Payment Method
                      </h3>
                      <div className="mt-2">
                        <select
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Select Payment Method</option>
                          <option value="GCash">GCash</option>
                          <option value="PayMaya">PayMaya</option>
                          <option value="Credit Card">Credit Card</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={() => setShowModal(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                  <button onClick={markAsPaid} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Profile />;
      case 'appointment':
        return <Appointment />;
      case 'tasks':
        return <Tasks />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="lg:w-56 bg-dark  ">
        <div className="flex items-center justify-center h-20 border-b border-light">
          <img className="w-40 h-16 object-contain m-4" src={Logo} alt="Logo" />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center px-4 py-2 text-white transition-colors duration-300 hover:bg-light-dark rounded-r-full relative ${
                  activeTab === 'dashboard' && 'text-primary'
                }`}
                onClick={() => handleTabClick('dashboard')}
              >
                <FaUserAlt className="mr-2" />
                Profile
                {activeTab === 'dashboard' && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-light-dark transition-all rounded-r-full duration-300" style={{ borderBottomWidth: '2px' }} />
                )}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center px-4 py-2 text-white transition-colors duration-300 hover:bg-light-dark rounded-r-full relative ${
                  activeTab === 'appointment' && 'text-primary'
                }`}
                onClick={() => handleTabClick('appointment')}
              >
                <FaCalendarAlt className="mr-2" />
                Appointments
                {activeTab === 'appointment' && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-light-dark transition-all rounded-r-full duration-300" style={{ borderBottomWidth: '2px' }} />
                )}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center px-4 py-2 text-white transition-colors duration-300 hover:bg-light-dark rounded-r-full relative ${
                  activeTab === 'tasks' && 'text-primary'
                }`}
                onClick={() => handleTabClick('tasks')}
              >
                <FaTasks className="mr-2" />
                Tasks
                {activeTab === 'tasks' && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-light-dark transition-all rounded-r-full duration-300" style={{ borderBottomWidth: '2px' }} />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-200 min-h-screen ">
        <header className="bg-light flex justify-end items-center px-4 py-2 border-b border-dark">
          <h1 className="text-xl font-bold text-dark m-4">Employee Dashboard</h1>
          <button className="text-white px-4 py-2 bg-dark rounded-full hover:bg-light-dark transition-colors duration-300" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Employee;
