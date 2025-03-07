const Usuario = require('../models/Usuario');

const login = (req, res) => {
  const { email, senha } = req.body;
  console.log('Dados recebidos no backend:', { email, senha });

  Usuario.buscarPorEmail(email, (err, results) => {
    if (err) {
      console.error('Erro no banco de dados:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      // E-mail não encontrado
      return res
        .status(401) // Retornamos 401 (não autorizado)
        .json({ success: false, message: 'E-mail não cadastrado.' });
    }

    if (results[0].senha !== senha) {
      // Senha incorreta
      return res
        .status(401) // 401 também
        .json({ success: false, message: 'Senha incorreta.' });
    }

    // Login bem-sucedido
    res.json({ success: true, user: results[0] });
  });
};

const cadastro = (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  // Validação dos campos
  if (!nome || !email || !senha || !telefone) {
    return res
      .status(400)
      .json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  console.log('Dados recebidos:', { nome, email, senha, telefone });

  Usuario.criar(nome, email, senha, telefone, (err, results) => {
    if (err) {
      console.error('Erro no banco de dados:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erro no servidor.' });
    }
    res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
  });
};

module.exports = { login, cadastro };
