const Animal = require('../models/Animal');

const criarAnimal = (req, res) => {
  const { nome, tipo, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id } = req.body;
  const foto = req.file; // O arquivo é acessado via req.file

  console.log('Dados recebidos:', {
    nome,
    tipo,
    descricao,
    status,
    ultima_localizacao,
    nome_dono,
    contato_dono,
    usuario_id,
    foto: foto ? foto.path : null, // Log do caminho do arquivo
  });

  if (!nome || !tipo || !descricao || !status || !ultima_localizacao || !nome_dono || !contato_dono || !usuario_id) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  Animal.criar(nome, tipo, foto ? foto.path : null, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id, (err, results) => {
    if (err) {
      console.error('Erro no banco de dados:', err);
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