class Router {
    constructor() {
      this.routes = { GET: {}, POST: {}, PUT: {}, PATCH: {}, DELETE: {} };
    }
  
    registerRoute(method, path, handler) {
      if (!this.routes[method]) throw new Error(`Unsupported HTTP method: ${method}`);
      this.routes[method][path] = handler;
    }
  
    get(path, handler) { this.registerRoute('GET', path, handler); }
    post(path, handler) { this.registerRoute('POST', path, handler); }
    put(path, handler) { this.registerRoute('PUT', path, handler); }
    patch(path, handler) { this.registerRoute('PATCH', path, handler); }
    delete(path, handler) { this.registerRoute('DELETE', path, handler); }
  
    match(method, path) {
      return this.routes[method] && this.routes[method][path];
    }
  }
  
  module.exports = Router;
  