const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./router');
const ErrorHandler = require('./ErrorHandler');

class App {
  constructor() {
    this.router = new Router();
    this.middlewares = [];

    this.get = this.router.get.bind(this.router);
    this.post = this.router.post.bind(this.router);
    this.put = this.router.put.bind(this.router);
    this.patch = this.router.patch.bind(this.router);
    this.delete = this.router.delete.bind(this.router);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  handleRequest(req, res) {
    const { method, url: requestUrl } = req;
    const { pathname, query } = url.parse(requestUrl);
    req.query = querystring.parse(query || '');
    req.params = {};

    let i = 0;
    const next = () => {
      try {
        if (i < this.middlewares.length) {
          this.middlewares[i++](req, res, next);
        } else {
          this.routeHandler(req, res, pathname, method);
        }
      } catch (err) {
        ErrorHandler.handle(err, req, res); 
      }
    };
    next();
  }

  routeHandler(req, res, pathname, method) {
    const handler = this.router.match(method, pathname);
    if (!handler) {
      ErrorHandler.handle(ErrorHandler.notFound(), req, res);
      return;
    }

    req.body = '';
    req.on('data', chunk => req.body += chunk);
    req.on('end', () => {
      try {
        req.body = req.body ? JSON.parse(req.body) : {};
        handler(req, res);
      } catch (err) {
        ErrorHandler.handle(ErrorHandler.invalidJson(), req, res); 
      }
    });
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => this.handleRequest(req, res));
    server.listen(port, callback);
  }
}

module.exports = App;
