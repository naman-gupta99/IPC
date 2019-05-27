const Response = {
  error(code, message, data = null) {
    return {
      success: false,
      code: code || 400,
      message: message || 'some error occoured',
      data,
    };
  },
  success(message, data = null) {
    return {
      success: true,
      code: 200,
      message,
      data,
    };
  },
};

export default Response;
