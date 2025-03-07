const express = require('express');
const { criarAnimal, listarAnimais, buscarAnimalPorId } = require('../controllers/animalController');

const router = express.Router();

router.post('/animais', criarAnimal);
router.get('/animais', listarAnimais);
router.get('/animais/:id', buscarAnimalPorId);

module.exports = router;