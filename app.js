const http = require('http');
const url = require('url');
const querystring = require('querystring');

class App {
  constructor() {
    this.routes = { GET: {}, POST: {}, PUT: {}, PATCH: {}, DELETE: {} };
    this.middlewares = [];
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

  use(middleware) { this.middlewares.push(middleware); }

  handleRequest(req, res) {
    const { method, url: requestUrl } = req;
    const { pathname, query } = url.parse(requestUrl);
    req.query = querystring.parse(query || '');
    req.params = {};

    let i = 0;
    const next = () => {
      if (i < this.middlewares.length) {
        this.middlewares[i++](req, res, next);
      } else {
        this.routeHandler(req, res, pathname, method);
      }
    };
    next();
  }

  routeHandler(req, res, pathname, method) {
    const handler = this.routes[method] && this.routes[method][pathname];
    if (!handler) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    req.body = '';
    req.on('data', chunk => req.body += chunk);
    req.on('end', () => {
      req.body = req.body ? JSON.parse(req.body) : {};
      handler(req, res);
    });
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => this.handleRequest(req, res));
    server.listen(port, callback);
  }
}

module.exports = App;
