const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const avistamentoRoutes = require('./routes/avistamentoRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', authRoutes);
app.use('/api', animalRoutes);
app.use('/api', avistamentoRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});