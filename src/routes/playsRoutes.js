const PlayController = require('../controllers/playsController');

module.exports = (router) => {
  router.get('/plays', PlayController.getAll);
  router.get('/plays/:id', PlayController.getById);
  router.post('/plays', PlayController.create);
  router.put('/plays/:id', PlayController.update);
  router.patch('/plays/:id', PlayController.partialUpdate);
  router.delete('/plays/:id', PlayController.delete);
};
