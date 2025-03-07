const db = require('../config/db');

class Usuario {
  static criar(nome, email, senha, telefone, callback) {
    const query = 'INSERT INTO Usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, senha, telefone], callback);
  }

  static buscarPorEmail(email, callback) {
    const query = 'SELECT * FROM Usuarios WHERE email = ?';
    db.query(query, [email], callback);
  }
}

module.exports = Usuario;