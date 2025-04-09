const db = require('../db/db');

class ActorsController {
  static getAll(req, res) {
    db.getAllActors()
      .then(actors => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(actors));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading actors file' }));
      });
  }

  static getById(req, res) {
    const actorId = parseInt(req.params.id, 10);
    db.getActorById(actorId)
      .then(actor => {
        if (!actor) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Actor not found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(actor));
        }
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error reading actors file' }));
      });
  }

  static create(req, res) {
    const newActor = req.body;
    db.createActor(newActor)
      .then(actor => {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(actor));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error saving actor' }));
      });
  }

  static update(req, res) {
    const actorId = parseInt(req.params.id, 10);
    const updatedData = req.body;
    db.updateActor(actorId, updatedData)
      .then(updatedActor => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedActor));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error saving actor' }));
      });
  }

  static delete(req, res) {
    const actorId = parseInt(req.params.id, 10);
    db.deleteActor(actorId)
      .then(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Actor deleted successfully' }));
      })
      .catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting actor' }));
      });
  }
}

module.exports = ActorsController;
