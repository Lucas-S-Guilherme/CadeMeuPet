const db = require('../config/db');

class Avistamento {
  static criar(animal_id, localizacao, observacoes, data_avistamento, usuario_id, callback) {
    const query = `
      INSERT INTO Avistamentos (animal_id, localizacao, observacoes, data_avistamento, usuario_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [animal_id, localizacao, observacoes, data_avistamento, usuario_id], callback);
  }

  static buscarPorAnimalId(animal_id, callback) {
    const query = 'SELECT * FROM Avistamentos WHERE animal_id = ?';
    db.query(query, [animal_id], callback);
  }
}

module.exports = Avistamento;