const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');  // For password hashing

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'], // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password should be at least 6 characters long'], // Password length validation
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only 'user' or 'admin' are allowed
      default: 'user', // Default role is 'user'
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified
  try {
    const salt = await bcrypt.genSalt(10); // Salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware if hashing fails
  }
});

// Method to compare hashed password during login
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare the plain password with the hashed password
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;


