const express = require('express');
const { criarAvistamento, buscarAvistamentosPorAnimal } = require('../controllers/avistamentoController');

const router = express.Router();

// Defina as rotas corretamente
router.post('/avistamentos', criarAvistamento);
router.get('/avistamentos/animal/:animal_id', buscarAvistamentosPorAnimal);

module.exports = router;