const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306, 
  user: 'root', 
  password: 'Banco1234!', 
  database: 'cademeupet',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

module.exports = db;