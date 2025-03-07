import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarrosselAnimais from '../components/CarrosselAnimais'; // Importe o componente

const Home = () => {
  const navigation = useNavigation();

  const handleRelatarAvistamento = (animal) => {
    navigation.navigate('RelatarAvistamento', { animal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/logocaramelo.jpeg')} style={styles.logo} />
      <Text style={styles.titulo}>Cadê Meu Pet</Text>
      <Text style={styles.subtitulo}>Encontre e proteja seus amiguinhos!</Text>

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={() => navigation.navigate('CadastroAnimalPerdido')}
      >
        <Text style={styles.textoBotaoCadastrar}>Cadastrar Animal Perdido</Text>
      </TouchableOpacity>

      <Text style={styles.tituloCarrossel}>🐾 Animais Desaparecidos</Text>

      {/* Use o componente CarrosselAnimais aqui */}
      <CarrosselAnimais onRelatarAvistamento={handleRelatarAvistamento} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  botaoCadastrar: {
    width: '80%',
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  textoBotaoCadastrar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tituloCarrossel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
});

export default Home;