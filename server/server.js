const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const avistamentoRoutes = require('./routes/avistamentoRoutes');
const getLocalIP = require('./getLocalIP'); // Importa o script que pega o IP local
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define o diretório para salvar os arquivos temporários


const app = express();
const port = 3000;
const localIP = getLocalIP(); // Obtém dinamicamente o IP da máquina

// Middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
// Use o middleware para processar o FormData
app.use(upload.single('foto')); // 'foto' é o nome do campo do arquivo


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
