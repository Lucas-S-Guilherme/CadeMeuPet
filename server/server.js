const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const avistamentoRoutes = require('./routes/avistamentoRoutes');
const getLocalIP = require('./getLocalIP'); // Importa o script que pega o IP local



const app = express();
const port = 3000;
const localIP = getLocalIP(); // Obtém dinamicamente o IP da máquina

// Middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());



// Rotas
app.use('/api', authRoutes);
app.use('/api', animalRoutes);
app.use('/api', avistamentoRoutes);

app.get('/api/get-ip', (req, res) => {
    res.json({ ip: getLocalIP() });
  });
  

// Iniciar o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://${localIP}:${port}`);
});
