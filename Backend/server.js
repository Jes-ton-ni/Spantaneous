const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session'); // npm install express-session
const MySQLStore = require('express-mysql-session')(session); // npm install express-mysql-session
const bcrypt = require('bcrypt'); //install bcrypt using this commant 'npm install bcrypt'

const app = express();
// app.use(cors());
// Enable CORS with credentials
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); // Parse JSON bodies

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0511',
  database: 'spantaneous'
});

// Error handling for database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// MySQL session store configuration
const sessionStore = new MySQLStore({
  database: 'spantaneous',
  table: 'sessions',
  host: 'localhost',
  user: 'root',
  password: '0511',
  expiration: 86400000, // Session expiration time in milliseconds
  createDatabaseTable: true, // Automatically create sessions table if not exists
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}, connection);

// Log session store configuration
console.log('Session store configuration:', sessionStore.options);

// Error handling for session store initialization
sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

// Configure session middleware
app.use(session({
  secret: 'you-always-on-my-mind',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: false, // Set to true if using HTTPS
    httpOnly: true // Prevents client-side access to the cookie
  }
}));

// Error handling middleware for Express
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { identifier, password } = req.body; // Use 'identifier' to accept either username or email
  const sql = 'SELECT * FROM users WHERE (username = ? OR email = ?)'; // Update SQL query to retrieve user by username or email
  connection.query(sql, [identifier, identifier], async (err, results) => { // Removed 'AND password = ?' from SQL query
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (results.length > 0) {
      const user = results[0];
      try {
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Set user data in the session upon successful login
          req.session.user = {
            user_id: user.user_id,
            username: user.username,
            Fname: user.Fname,
            Lname: user.Lname,
            contact: user.contact,
            email: user.email
          };
          console.log('User logged in:', req.session.user); // Log session use
          return res.json({ success: true, message: 'Login successful' });
        } else {
          return res.status(401).json({ success: false, message: 'Invalid password' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
  });
});

// Endpoint for checking login status
app.get('/check-login', (req, res) => {
  // Retrieve session data from the database
  sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error('Error fetching session from database:', err);
      return res.status(500).json({ isLoggedIn: false, error: 'Internal server error' });
    }

    // Check if session exists and has user data
    if (session && session.user) {
      // User is logged in
      return res.status(200).json({ isLoggedIn: true, user: session.user });
    } else {
      // Session not found or user not logged in
      return res.status(200).json({ isLoggedIn: false });
    }
  });
});

// Endpoint to get username from session
app.get('/get-username', (req, res) => {
  // Check if user is logged in and session contains username
  if (req.session.user && req.session.user.username) {
    const { username } = req.session.user;
    return res.json({ success: true, username });
  } else {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, password, firstName, lastName, phone, email } = req.body;

  console.log('Received signup request:', req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, Fname, Lname, contact, email) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(sql, [username, hashedPassword, firstName, lastName, phone, email], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
      }

      console.log('Signup successful. Affected rows:', results.affectedRows);

      // Return a success response
      return res.json({ success: true, message: 'Signup successful' });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ success: false, message: 'Error hashing password' });
  }
});

// Endpoint for user logout
app.post('/logout', (req, res) => {
  // Check if session exists in the session store
  sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.error('Error fetching session from database:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Check if session exists and has user data
    if (session && session.user) {
      const userId = session.user.user_id;
      // Destroy the session in the database using the session ID
      sessionStore.destroy(req.sessionID, (err) => {
        if (err) {
          console.error('Error destroying session in database:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        // Clear cookies by setting their expiration time to a past date
        res.clearCookie('connect.sid');
        // Destroy the session on the server
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
          }
          // Session destroyed successfully
          return res.json({ success: true, message: 'Logout successful' });
        });
      });
    } else {
      // If session does not exist or does not contain user data
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
  });
});

// Endpoint for admin list of client
app.get('/clients', (req, res) => {
  // SQL query to select all users
  const sql = 'SELECT * FROM users';

  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of users as the response
    return res.json({ success: true, users: results });
  });
});

// Endpoint for admin list of employee
app.get('/employees', (req, res) => {
  // SQL query to select all users
  const sql = 'SELECT * FROM employee';

  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of users as the response
    return res.json({ success: true, users: results });
  });
});

// Endpoint to delete a client by ID
app.delete('/clients/:id', (req, res) => {
  const clientId = req.params.id;
  const sql = 'DELETE FROM users WHERE user_id = ?';
  connection.query(sql, [clientId], (error, results) => {
    if (error) {
      console.error('Error deleting client:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete client' });
    }
    if (results.affectedRows === 0) {
      // No client found with the given ID
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    return res.json({ success: true, message: 'Client deleted successfully' });
  });
});

// Endpoint to delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const sql = 'DELETE FROM employee WHERE employee_id = ?';
  connection.query(sql, [employeeId], (error, results) => {
    if (error) {
      console.error('Error deleting employee:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete employee' });
    }
    if (results.affectedRows === 0) {
      // No employee found with the given ID
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    return res.json({ success: true, message: 'Employee deleted successfully' });
  });
});

// Endpoint to get all services
app.get('/services', (req, res) => {
  const sql = 'SELECT * FROM services'; 
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Initialize an empty object to store categorized services
    const categorizedServices = {
      'All': [],
      'Massage': [],
      'Facial': [],
      'Nail Treatment': [],
      'Body Treatment': []
    };
    // Iterate over the results and push each service into the corresponding category
    results.forEach(service => {
      // Create a copy of the service object to avoid modifying the original object
      const categorizedService = { ...service };
      // Initialize the category array if it's not already initialized
      if (!categorizedServices[service.category]) {
        categorizedServices[service.category] = [];
      }
      // Push the service into the corresponding category
      categorizedServices[service.category].push(categorizedService);
      // Also push each service into the 'All' category
      categorizedServices['All'].push(categorizedService);
    });
    
    // Send the categorized services data as the response
    return res.json({ success: true, services: categorizedServices });
  });
});

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  // Return the file path or URL
  return res.json({ success: true, imagePath: req.file.path });
});

// Endpoint for creating a new service with an image
app.post('/services', upload.single('image'), (req, res) => {
  // Extract service data from request body
  const { service_name, description, price, category, image, image_path } = req.body;

  // Insert service data into the database
  const sql = 'INSERT INTO services (service_name, description, price, category, image, image_path) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [service_name, description, price, category, image, image_path], (err, results) => {
    if (err) {
      console.error('Error creating service:', err);
      return res.status(500).json({ success: false, message: 'Failed to create service' });
    }
    return res.json({ success: true, message: 'Service created successfully' });
  });
});

// Endpoint for updating service
app.put('/services/:id', upload.single('image'), (req, res) => {
  //console.log(req.file); // Log the file upload object
  console.log(req.body); // Log the request body

  const serviceId = req.params.id;
  // Extract updated service data from request body
  const { service_name, description, price, category, image, image_path} = req.body;

  // Update service data in the database
  let sql;
  let params;

  sql = 'UPDATE services SET service_name = ?, description = ?, price = ?, category = ?, image = ?, image_path = ? WHERE service_id = ?';
  params = [service_name, description, price, category, image, image_path, serviceId];

  console.log(sql, params); // Log SQL query and params for debugging

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error updating service:', err);
      return res.status(500).json({ success: false, message: 'Failed to update service' });
    }
    if (results.affectedRows === 0) {
      // No service found with the given ID
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.json({ success: true, message: 'Service updated successfully' });
  });
});

const fs = require('fs');
const { connect } = require('http2');

// Endpoint for deleting a service by ID
app.delete('/services/:id', (req, res) => {
  const serviceId = req.params.id;

  // Get the image path from the database before deleting the service
  const sqlSelectImagePath = 'SELECT image_path FROM services WHERE service_id = ?';
  connection.query(sqlSelectImagePath, [serviceId], (err, results) => {
    if (err) {
      console.error('Error selecting image path:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete service' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    // Delete the image file from the folder
    const imagePath = results[0].image_path;
    if (imagePath) {
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting image file:', unlinkErr);
          // Continue with deleting the service even if there's an error deleting the image
        }
        
        // Delete service from the database after removing the image file
        const sqlDeleteService = 'DELETE FROM services WHERE service_id = ?';
        connection.query(sqlDeleteService, [serviceId], (deleteErr, deleteResults) => {
          if (deleteErr) {
            console.error('Error deleting service:', deleteErr);
            return res.status(500).json({ success: false, message: 'Failed to delete service' });
          }
          if (deleteResults.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Service not found' });
          }
          return res.json({ success: true, message: 'Service deleted successfully' });
        });
      });
    } else {
      // If the service does not have an image, just delete the service from the database
      const sqlDeleteService = 'DELETE FROM services WHERE service_id = ?';
      connection.query(sqlDeleteService, [serviceId], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error('Error deleting service:', deleteErr);
          return res.status(500).json({ success: false, message: 'Failed to delete service' });
        }
        if (deleteResults.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Service not found' });
        }
        return res.json({ success: true, message: 'Service deleted successfully' });
      });
    }
  });
});

// Endpoint to fetch appointments
app.get('/appointments', (req, res) => {
  // SQL query to join appointments, users, and services tables to get relevant data
  const sql = `
    SELECT 
      appointments.appointment_id,
      appointments.customer_id,
      users.username,
      CONCAT(
        UPPER(SUBSTRING(users.Fname, 1, 1)),
        LOWER(SUBSTRING(users.Fname, 2)),
        ' ',
        UPPER(SUBSTRING(users.Lname, 1, 1)),
        LOWER(SUBSTRING(users.Lname, 2))
      ) AS name,
      users.email,
      users.contact,
      services.service_name AS service,
      services.category,
      appointments.date_appointed,
      appointments.message,
      services.price AS price_final,
      appointments.request_status,
      appointments.appointment_status,
      appointments.payment_status
    FROM 
      appointments
    INNER JOIN 
      users ON appointments.customer_id = users.user_id
    INNER JOIN 
      services ON appointments.service_booked = services.service_id
    ORDER BY appointments.payment_status
  `;
  
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of appointments as the response
    return res.json({ success: true, appointments: results });
  });
});

// Endpoint to add an appointment
app.post('/set-appointment', async (req, res) => {
  const { date, time, customer_id, service_id, message } = req.body;

  console.log('Received appointment request:', req.body);
 
  // Combine date and time into a single Date object
  const date_appointed = new Date(`${date} ${time}`);

  const sql = `INSERT INTO appointments (date_appointed, customer_id, service_booked, message) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [date_appointed, customer_id, service_id, message], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server', error: err.message });
    }

    console.log('Appointment sent successfully. Affected rows:', results.affectedRows);

    return res.json({ success: true, message: 'Appointment sent successfully' });
  });
});

// Endpoint to fetch assignedEmployee
app.get('/assigned_employee', (req, res) => {
  // SQL query to join appointments, users, and services tables to get relevant data
  const sql = `
    SELECT 
      appointments.appointment_id,
      users.username,
      CONCAT(
        UPPER(SUBSTRING(users.Fname, 1, 1)),
        LOWER(SUBSTRING(users.Fname, 2)),
        ' ',
        UPPER(SUBSTRING(users.Lname, 1, 1)),
        LOWER(SUBSTRING(users.Lname, 2))
      ) AS name,
      users.email,
      users.contact,
      services.service_name AS service,
      appointments.date_appointed,
      appointments.request_status,
      CONCAT(
        UPPER(SUBSTRING(employee.Fname, 1, 1)),
        LOWER(SUBSTRING(employee.Fname, 2)),
        ' ',
        UPPER(SUBSTRING(employee.Lname, 1, 1)),
        LOWER(SUBSTRING(employee.Lname, 2))
      ) AS assignedEmployee
    FROM 
      appointments
    INNER JOIN 
      users ON appointments.customer_id = users.user_id
    INNER JOIN 
      services ON appointments.service_booked = services.service_id
    INNER JOIN
      assigned_employee ON appointments.appointment_id = assigned_employee.appointment_id
    INNER JOIN
      employee ON assigned_employee.employee_id = employee.employee_id
    ORDER BY appointments.payment_status
  `;

  
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Send the list of appointments as the response
    return res.json({ success: true, appointments: results });
  });
});

// Endpoint to handle POST requests for assigning employees
app.post('/assigned-employees', (req, res) => {
  // Extract data from the request body
  const { employee_id, appointment_id, service_category, status } = req.body;

  console.log('Received assidned-employee request:', req.body);
  // SQL query to insert data into the assigned_employee table
  const sql = `
    INSERT INTO assigned_employee (employee_id, appointment_id, service_category, status)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the SQL query
  connection.query(sql, [employee_id, appointment_id, service_category, status], (err, results) => {
    if (err) {
      console.error('Error assigning employee:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Check if the assignment was successful
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Employee assignment failed' });
    }
    // Send success response

    return res.json({ success: true, message: 'Employee assigned successfully' });
  });
});
 

// Endpoint to set request status of appointments to 3 for declined appointment
app.put('/appointments/:appointmentId/request-status', (req, res) => {
  const { appointmentId } = req.params;
  const { request_status } = req.body;

  // Validate input
  if (typeof request_status !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid request status' });
  }

  // SQL query to update request status
  const sql = `
    UPDATE appointments
    SET request_status = ?
    WHERE appointment_id = ?
  `;

  // Execute the SQL query
  connection.query(sql, [request_status, appointmentId], (err, results) => {
    if (err) {
      //console.error('Error updating request status:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Check if the appointment was found and updated
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    // Send success response
    return res.json({ success: true, message: 'Request status updated successfully' });
  });
});

// Endpoint to update payment status of appointments
app.put('/appointments/:appointmentId/payment-status', (req, res) => {
  const { appointmentId } = req.params;
  const { payment_status } = req.body;

  // Validate input
  if (typeof payment_status !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Invalid payment status' });
  }

  // SQL query to update payment status
  const sql = `
    UPDATE appointments
    SET payment_status = ?
    WHERE appointment_id = ?
  `;

  // Execute the SQL query
  connection.query(sql, [payment_status, appointmentId], (err, results) => {
    if (err) {
      //console.error('Error updating payment status:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    // Check if the appointment was found and updated
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    // Send success response
    return res.json({ success: true, message: 'Payment status updated successfully' });
  });
});


// Endpoint for booking appointments
app.post('/bookings', (req, res) => {
  // Extract booking data from request body
  const { name, email, phone, service, date, time, message } = req.body;

  // Insert booking data into the database
  const sql = 'INSERT INTO appointments (name, email, phone, service, date, time, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, email, phone, service, date, time, message], (err, results) => {
    if (err) {
      console.error('Error creating appointment:', err);
      return res.status(500).json({ success: false, message: 'Failed to create appointment' });
    }
    return res.json({ success: true, message: 'Appointment booked successfully' });
  });
});

// End point for getting the list of the staffs with their taks
app.get('/staffs', (req, res) => {
  // SQL query to select all the users from the emplyoee and the task done in the assigned_emmployee table
  const sql = `
    SELECT 
      e.employee_id AS employee_id,
      CONCAT(
          UPPER(SUBSTRING(e.Fname, 1, 1)),
          LOWER(SUBSTRING(e.Fname, 2)),
          ' ',
          UPPER(SUBSTRING(e.Lname, 1, 1)),
          LOWER(SUBSTRING(e.Lname, 2))
      ) AS name,
      ae.service_category AS task,
      SUM(ae.status = 1) AS completedTasks,
      SUM(ae.status = 0) AS pendingTasks
    FROM
      employee e
    INNER JOIN
      assigned_employee ae ON e.employee_id = ae.employee_id
    GROUP BY
      employee_id,
      name,
      task
    `;

    // Execute the SQL query
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ success: false, message: 'Internal server error'});
      }
      // Send the list of the staffs with their task done as the response
      return res.json({ success: true, staffs: results})
    });  
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
