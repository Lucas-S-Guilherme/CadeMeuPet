import axios from 'axios';
import { Platform } from 'react-native';

// Se estiver rodando no Expo, usa o IP fornecido pelo backend ou 'localhost' se não encontrado
const getBackendURL = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/get-ip'); // Backend retorna o IP correto
    const { ip } = await response.json();
    return `http://${ip}:3000/api`;
  } catch (error) {
    console.error('Erro ao obter IP do backend:', error);
    return 'http://localhost:3000/api'; // Fallback para localhost
  }
};

const api = axios.create({
  baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api',
});

export default api;
