const db = require('../config/db');

class Animal {
  static criar(nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id, callback) {
    const query = `
      INSERT INTO Animais (nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [nome, tipo, foto, descricao, status, ultima_localizacao, nome_dono, contato_dono, usuario_id], callback);
  }

  static buscarTodos(callback) {
    const query = 'SELECT * FROM Animais';
    db.query(query, callback);
  }

  static buscarPorId(id, callback) {
    const query = 'SELECT * FROM Animais WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Animal;