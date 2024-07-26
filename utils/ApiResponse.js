class ApiResponse {
    constructor(status, success, data = null, message = "", error = null, stack = "") {
      this.status = status;
      this.success = success;
      this.data = data;
      this.message = message;
      this.error = error;
  
      if (stack) {
        this.stack = stack;
      } else if (!success) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    static error(status, message, error = null) {
      return new ApiResponse(status, false, null, message, error);
    }
  
    static success(status, data, message) {
      return new ApiResponse(status, true, data, message);
    }
  }
  
  export { ApiResponse };
  