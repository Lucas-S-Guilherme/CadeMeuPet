const axios = require('axios');
const express = require('express');
const router = express.Router();

const GOOGLE_MAPS_API_KEY = 'AIzaSyDeLSUztISdD61ahTYmYMp7fiff2NmE6xQ'; // Substitua pela sua chave de API do Google Maps

router.get('/geocodificar', async (req, res) => {
  const { lat, lng } = req.query;

  // Verifica se as coordenadas foram fornecidas
  if (!lat || !lng) {
    return res.status(400).json({ success: false, message: 'Coordenadas inválidas.' });
  }

  try {
    // Faz a requisição à API de Geocodificação Reversa do Google Maps
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    // Verifica se a resposta contém resultados
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const endereco = response.data.results[0].formatted_address; // Endereço formatado
      res.json({ success: true, endereco });
    } else {
      res.status(400).json({ success: false, message: 'Não foi possível geocodificar as coordenadas.' });
    }
  } catch (error) {
    console.error('Erro na geocodificação:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor.' });
  }
});

module.exports = router;