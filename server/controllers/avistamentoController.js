const Avistamento = require('../models/Avistamento');

const criarAvistamento = (req, res) => {
  const { animal_id, localizacao, observacoes, data_avistamento, usuario_id } = req.body;
  Avistamento.criar(animal_id, localizacao, observacoes, data_avistamento, usuario_id, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, message: 'Avistamento registrado com sucesso!' });
  });
};

const buscarAvistamentosPorAnimal = (req, res) => {
  const { animal_id } = req.params;
  Avistamento.buscarPorAnimalId(animal_id, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, avistamentos: results });
  });
};

module.exports = {
  criarAvistamento,
  buscarAvistamentosPorAnimal,
};