import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Mapa from '../components/Mapa'; // Importe o componente Mapa
import api from '../services/api';

const CadastroAnimalPerdido = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
  const [nomeDono, setNomeDono] = useState('');
  const [contatoDono, setContatoDono] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (coordinate) => {
    setSelectedLocation(coordinate);
    setUltimaLocalizacao(`${coordinate.latitude}, ${coordinate.longitude}`);
  };

  const handleCadastro = async () => {
    if (!nome || !tipo || !descricao || !selectedLocation || !nomeDono || !contatoDono) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const dados = {
      nome,
      tipo,
      descricao,
      status: 'perdido',
      ultima_localizacao: `${selectedLocation.latitude}, ${selectedLocation.longitude}`,
      nome_dono: nomeDono,
      contato_dono: contatoDono,
      usuario_id: 1, // Substitua pelo ID do usuário logado
    };

    try {
      const response = await api.post('/animais', dados);
      if (response.data.success) {
        Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o animal.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o animal.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Animal Perdido</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Animal"
        value={nome}
        onChangeText={setNome}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o tipo de animal" value="" />
          <Picker.Item label="Cachorro" value="cachorro" />
          <Picker.Item label="Gato" value="gato" />
          <Picker.Item label="Papagaio" value="papagaio" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do Dono"
        value={nomeDono}
        onChangeText={setNomeDono}
      />

      <TextInput
        style={styles.input}
        placeholder="Contato do Dono"
        value={contatoDono}
        onChangeText={setContatoDono}
      />

      {/* Mapa para selecionar a localização */}
      <View style={styles.mapaContainer}>
        <Mapa
          initialRegion={{
            latitude: -10.8817, // Latitude de Ji-Paraná
            longitude: -61.9518, // Longitude de Ji-Paraná
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLocationSelect={handleLocationSelect}
        />
      </View>

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleCadastro}>
        <Text style={styles.textoBotaoSalvar}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  mapaContainer: {
    width: '100%',
    height: 300, // Altura do mapa
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroAnimalPerdido;