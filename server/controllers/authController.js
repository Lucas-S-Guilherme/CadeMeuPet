const Usuario = require('../models/Usuario');

const login = (req, res) => {
  const { email, senha } = req.body;
  Usuario.buscarPorEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    if (results.length > 0 && results[0].senha === senha) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });
    }
  });
};

const cadastro = (req, res) => {
  const { nome, email, senha, telefone } = req.body;
  Usuario.criar(nome, email, senha, telefone, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
  });
};

module.exports = { login, cadastro };