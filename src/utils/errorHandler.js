// utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err.stack);
  
    // Default error message and status code
    let message = 'Internal Server Error';
    let statusCode = 500;
  
    // Handle specific error types
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle JSON parsing errors
      message = 'Invalid JSON payload';
      statusCode = 400;
    } else if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      message = err.message;
      statusCode = 400;
    } else if (err.name === 'UnauthorizedError') {
      // Handle JWT authentication errors
      message = 'Unauthorized';
      statusCode = 401;
    }
  
    // Send the error response
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;
  