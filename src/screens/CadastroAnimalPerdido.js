import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importe o Picker
import api from '../services/api';

const CadastroAnimalPerdido = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(''); // Estado inicial vazio
  const [descricao, setDescricao] = useState('');
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
  const [nomeDono, setNomeDono] = useState('');
  const [contatoDono, setContatoDono] = useState('');

  const handleCadastro = async () => {
    if (!nome || !tipo || !descricao || !ultimaLocalizacao || !nomeDono || !contatoDono) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const dados = {
      nome,
      tipo,
      descricao,
      status: 'perdido',
      ultima_localizacao: ultimaLocalizacao,
      nome_dono: nomeDono,
      contato_dono: contatoDono,
      usuario_id: 1, // Substitua pelo ID do usuário logado
    };

    console.log('Dados enviados:', dados); // Log dos dados

    try {
      console.log('Enviando requisição para o backend...'); // Log antes de enviar a requisição

      const response = await api.post('/animais', dados, {
        headers: {
          'Content-Type': 'application/json', // Envia como JSON
        },
      });

      console.log('Resposta da API:', response.data); // Log da resposta da API

      if (response.data.success) {
        Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o animal.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error); // Log do erro completo
      if (error.response) {
        // Erro com resposta do servidor
        console.error('Resposta do servidor:', error.response.data);
      } else if (error.request) {
        // Erro sem resposta do servidor
        console.error('Sem resposta do servidor:', error.request);
      } else {
        // Outros erros
        console.error('Erro ao configurar a requisição:', error.message);
      }
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

      {/* Dropdown para o tipo do animal */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o tipo de animal" value="" /> {/* Placeholder */}
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
        placeholder="Última Localização"
        value={ultimaLocalizacao}
        onChangeText={setUltimaLocalizacao}
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