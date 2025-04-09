class ErrorHandler {
    static handle(err, req, res) {
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';
  
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: false,
        error: message
      }));
    }
  
    static create(message, statusCode = 500) {
      const error = new Error(message);
      error.statusCode = statusCode;
      return error;
    }

    static invalidJson() {
      return this.create('Invalid JSON', 400);
    }
  
    static notFound() {
      return this.create('Not Found', 404);
    }
  
    static internalError() {
      return this.create('Internal Server Error', 500);
    }
  }
  
  module.exports = ErrorHandler;
  