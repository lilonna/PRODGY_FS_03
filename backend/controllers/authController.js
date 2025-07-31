const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Test endpoint
const test = (req, res) => {
  res.json('Test is working');
};

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, role } = req.body;

    // Validate input
    if (!fname || !lname) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password should be at least 6 characters long' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    // Register admin user (can be done manually or with a separate admin registration logic)

  

//   registerAdmin();
  const initializeAdmin = async () => {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      await User.create({
        fname: 'Admin',
        lname: 'User',
        email: 'admin@example.com',
        password: await hashPassword('admin123'),
        role: 'admin',
      });
      console.log('Admin user created');
    }
  };
  
  initializeAdmin();
  
  

    // Create a new user
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: role || 'user',  // Default role is 'user'
    });

    // Return user without password for security
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login endpoint
// Login endpoint
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Hardcoded admin credentials
    const adminEmail = 'admin@example.com'; // Predefined admin email
    const adminPassword = 'admin123'; // Predefined admin password
  
    // Check if the email matches the admin's hardcoded credentials
    if (email === adminEmail && password === adminPassword) {
      const adminUser = { email, fname: 'Admin', role: 'admin' }; // Hardcoded admin object
  
      // Sign JWT token for the admin
      jwt.sign({ email: adminUser.email, id: adminUser._id, name: adminUser.fname, role: adminUser.role }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(adminUser); // Send response with token
      });
  
      // Exit early so the regular user login code does not execute
      return;
    }
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if password matches
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id, name: user.fname, role: user.role },
        process.env.JWT_SECRET, // Make sure to set this in your .env file
        { expiresIn: '1h' }  // Token expires in 1 hour
      );
  
      // Set token as a cookie
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  
      // Send user data excluding password
      user.password = undefined;
      res.status(200).json({
        userData: {
          email: user.email,
          fname: user.fname,
          role: user.role, // Include the role field
        },
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Logout endpoint
const logoutUser = (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'You have been logged out successfully' });
};

// Get profile endpoint
const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.status(200).json(user);  // Return user data based on the token
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
};
