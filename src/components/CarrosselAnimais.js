import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CarrosselAnimais = ({ onRelatarAvistamento }) => {
  const [animaisDesaparecidos, setAnimaisDesaparecidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const buscarAnimaisDesaparecidos = async () => {
      try {
        const response = await api.get('/animais');
        if (response.data.success) {
          // Para cada animal, buscar o endereço formatado
          const animaisComEndereco = await Promise.all(
            response.data.animais.map(async (animal) => {
              const [latitude, longitude] = animal.ultima_localizacao.split(',').map(Number);
              const endereco = await buscarEndereco(latitude, longitude);
              return {
                ...animal,
                endereco: endereco || 'Endereço não disponível',
              };
            })
          );
          setAnimaisDesaparecidos(animaisComEndereco);
        } else {
          setErro('Erro ao buscar animais.');
        }
      } catch (error) {
        setErro('Erro na conexão com o servidor.');
      } finally {
        setCarregando(false);
      }
    };

    buscarAnimaisDesaparecidos();
  }, []);

  const buscarEndereco = async (latitude, longitude) => {
    try {
      const GOOGLE_MAPS_API_KEY = 'AIzaSyDeLSUztISdD61ahTYmYMp7fiff2NmE6xQ'; // Substitua pela sua chave de API do Google Maps
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address; // Retorna o endereço formatado
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return null;
    }
  };

  if (carregando) {
    return (
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color="#ff9800" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.erroContainer}>
        <Text style={styles.erroTexto}>{erro}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const [latitude, longitude] = item.ultima_localizacao.split(',').map(Number);

    return (
      <View style={styles.card}>
        <Image source={require('../../assets/images/logocaramelo.jpeg')} style={styles.imagemAnimal} />
        <Text style={styles.nomeAnimal}>{item.nome || 'Nome não disponível'}</Text>
        <Text style={styles.localAnimal}>{item.endereco || 'Endereço não disponível'}</Text>
        <Text style={styles.descricaoAnimal}>{item.descricao || 'Descrição não disponível'}</Text>
        <TouchableOpacity
          style={styles.botaoAvistamento}
          onPress={() => onRelatarAvistamento(item)}
        >
          <Text style={styles.textoBotaoAvistamento}>Relatar Avistamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoMapa}
          onPress={() =>
            navigation.navigate('Mapa', {
              initialRegion: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            })
          }
        >
          <Text style={styles.textoBotaoMapa}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Carousel
      data={animaisDesaparecidos}
      renderItem={renderItem}
      width={width * 0.8}
      height={350}
      loop
      autoPlay
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imagemAnimal: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  nomeAnimal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  localAnimal: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
    textAlign: 'center',
  },
  descricaoAnimal: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  botaoAvistamento: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotaoAvistamento: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoMapa: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotaoMapa: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  erroTexto: {
    color: 'red',
    fontSize: 16,
  },
});

export default CarrosselAnimais;