const apiResponseHandler = (res, status, message, data) => {
    const statusCode = status || 200;
    const responseMessage = message || 'Operation successful';
    const responseData = data || {};
    res.status(statusCode).json({ message: responseMessage, data: responseData });
};

export default apiResponseHandler;