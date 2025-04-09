const ActorController = require('../controllers/actorsController');

module.exports = (router) => {
  router.get('/actors', ActorController.getAll);
  router.get('/actors/:id', ActorController.getById);
  router.post('/actors', ActorController.create);
  router.put('/actors/:id', ActorController.update);
  router.patch('/actors/:id', ActorController.partialUpdate);
  router.delete('/actors/:id', ActorController.delete);
};
