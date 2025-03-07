import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

// Dados dos animais desaparecidos (centralizados aqui)
const animaisDesaparecidos = [
  {
    id: '1',
    nome: 'Bolinha',
    local: 'Rua das Flores, 123',
    descricao: 'Pequeno, pelagem marrom, muito dócil.',
    imagem: require('../../assets/images/bolinha.jpeg'), // Foto estática
  },
  {
    id: '2',
    nome: 'Minha',
    local: 'Praça Central',
    descricao: 'Gata branca com olhos azuis. Usa coleira vermelha.',
    imagem: require('../../assets/images/minha.jpg'), // Foto estática
  },
  {
    id: '3',
    nome: 'Thor',
    local: 'Avenida Paulista',
    descricao: 'Husky siberiano, olhos azuis, sumiu de casa.',
    imagem: require('../../assets/images/thor.jpg'), // Foto estática
  },
];

const CarrosselAnimais = ({ onRelatarAvistamento }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.imagemAnimal} />
      <Text style={styles.nomeAnimal}>{item.nome}</Text>
      <Text style={styles.localAnimal}>{item.local}</Text>
      <Text style={styles.descricaoAnimal}>{item.descricao}</Text>
      <TouchableOpacity
        style={styles.botaoAvistamento}
        onPress={() => onRelatarAvistamento(item)}
      >
        <Text style={styles.textoBotaoAvistamento}>Relatar Avistamento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Carousel
      data={animaisDesaparecidos} // Usa o array centralizado
      renderItem={renderItem}
      width={width * 0.8}
      height={300} // Ajuste a altura conforme necessário
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
});

export default CarrosselAnimais;