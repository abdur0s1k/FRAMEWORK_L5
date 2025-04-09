const fs = require('fs');
const path = require('path');

const actorsFilePath = path.join(__dirname, '../db/actors.json');
const playsFilePath = path.join(__dirname, '../db/plays.json');

const readDataFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const writeDataToFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getAllActors = () => {
  return readDataFromFile(actorsFilePath);
};

const getActorById = (id) => {
  return readDataFromFile(actorsFilePath).then((actors) => {
    return actors.find((actor) => actor.id === id);
  });
};

const createActor = (newActor) => {
  return readDataFromFile(actorsFilePath).then((actors) => {
    const newId = actors.length ? actors[actors.length - 1].id + 1 : 1;
    newActor.id = newId;
    actors.push(newActor);
    return writeDataToFile(actorsFilePath, actors).then(() => newActor);
  });
};

const updateActor = (id, updatedData) => {
  return readDataFromFile(actorsFilePath).then((actors) => {
    const actorIndex = actors.findIndex((actor) => actor.id === id);
    if (actorIndex === -1) throw new Error('Actor not found');
    actors[actorIndex] = { ...actors[actorIndex], ...updatedData };
    return writeDataToFile(actorsFilePath, actors).then(() => actors[actorIndex]);
  });
};

const deleteActor = (id) => {
  return readDataFromFile(actorsFilePath).then((actors) => {
    const updatedActors = actors.filter((actor) => actor.id !== id);
    if (actors.length === updatedActors.length) throw new Error('Actor not found');
    return writeDataToFile(actorsFilePath, updatedActors);
  });
};

const getAllPlays = () => {
  return readDataFromFile(playsFilePath);
};

const getPlayById = (id) => {
  return readDataFromFile(playsFilePath).then((plays) => {
    return plays.find((play) => play.id === id);
  });
};

const createPlay = (newPlay) => {
  return readDataFromFile(playsFilePath).then((plays) => {
    const newId = plays.length ? plays[plays.length - 1].id + 1 : 1;
    newPlay.id = newId;
    plays.push(newPlay);
    return writeDataToFile(playsFilePath, plays).then(() => newPlay);
  });
};

const updatePlay = (id, updatedData) => {
  return readDataFromFile(playsFilePath).then((plays) => {
    const playIndex = plays.findIndex((play) => play.id === id);
    if (playIndex === -1) throw new Error('Play not found');
    plays[playIndex] = { ...plays[playIndex], ...updatedData };
    return writeDataToFile(playsFilePath, plays).then(() => plays[playIndex]);
  });
};

const deletePlay = (id) => {
  return readDataFromFile(playsFilePath).then((plays) => {
    const updatedPlays = plays.filter((play) => play.id !== id);
    if (plays.length === updatedPlays.length) throw new Error('Play not found');
    return writeDataToFile(playsFilePath, updatedPlays);
  });
};

module.exports = {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor,
  getAllPlays,
  getPlayById,
  createPlay,
  updatePlay,
  deletePlay,
};
