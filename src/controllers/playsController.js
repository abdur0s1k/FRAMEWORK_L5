const db = require('../db/db');

class PlaysController {
  static getAll(req, res) {
    db.getAllPlays()
      .then(plays => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(plays));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading plays file' }));
      });
  }

  static getById(req, res) {
    const playId = parseInt(req.params.id, 10);
    db.getPlayById(playId)
      .then(play => {
        if (!play) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Play not found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(play));
        }
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading plays file' }));
      });
  }

  static create(req, res) {
    const newPlay = req.body;
    db.createPlay(newPlay)
      .then(play => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(play));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error saving play' }));
      });
  }

  static update(req, res) {
    const playId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    db.updatePlay(playId, updatedData)
      .then(updatedPlay => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedPlay));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error saving play' }));
      });
  }

  static delete(req, res) {
    const playId = parseInt(req.params.id, 10);
    db.deletePlay(playId)
      .then(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Play deleted successfully' }));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting play' }));
      });
  }
}

module.exports = PlaysController;
