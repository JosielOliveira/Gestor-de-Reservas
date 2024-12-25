const Space = require('../models/Space');

// Crear un nuevo espacio
exports.createSpace = async (req, res) => {
  try {
    const space = new Space(req.body);
    await space.save();
    res.status(201).send(space);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los espacios
exports.getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();
    res.send(spaces);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener un espacio por ID
exports.getSpaceById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).send('Space not found');
    }
    res.send(space);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar un espacio
exports.updateSpace = async (req, res) => {
  try {
    const space = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!space) {
      return res.status(404).send('Space not found');
    }
    res.send(space);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un espacio
exports.deleteSpace = async (req, res) => {
  try {
    const space = await Space.findByIdAndDelete(req.params.id);
    if (!space) {
      return res.status(404).send('Space not found');
    }
    res.send(space);
  } catch (error) {
    res.status(400).send(error);
  }
};