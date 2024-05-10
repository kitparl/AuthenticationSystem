// utils/validation.js
const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // Example: Password must be at least 8 characters long
    return password.length >= 8;
  };
  
  module.exports = { validateEmail, validatePassword };
  