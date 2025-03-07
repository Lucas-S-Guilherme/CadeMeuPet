const Animal = require('../models/Animal');

const criarAnimal = (req, res) => {
  const { nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id } = req.body;
  Animal.criar(nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, message: 'Animal cadastrado com sucesso!' });
  });
};

const listarAnimais = (req, res) => {
  Animal.buscarTodos((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, animais: results });
  });
};

const buscarAnimalPorId = (req, res) => {
  const { id } = req.params;
  Animal.buscarPorId(id, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    if (results.length > 0) {
      res.json({ success: true, animal: results[0] });
    } else {
      res.status(404).json({ success: false, message: 'Animal não encontrado.' });
    }
  });
};

module.exports = { criarAnimal, listarAnimais, buscarAnimalPorId };