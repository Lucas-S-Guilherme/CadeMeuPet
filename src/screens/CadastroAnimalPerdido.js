import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

const CadastroAnimalPerdido = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [foto, setFoto] = useState(null); // Inicialize como null
  const [descricao, setDescricao] = useState('');
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
  const [nomeDono, setNomeDono] = useState('');
  const [contatoDono, setContatoDono] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto({ uri: result.uri }); // Atualiza com a nova imagem
    }
  };

  const handleCadastro = async () => {
    if (!nome || !tipo || !descricao || !ultimaLocalizacao || !nomeDono || !contatoDono) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('tipo', tipo);

    // Verifica se a foto é uma imagem selecionada
    if (foto && foto.uri) {
      formData.append('foto', {
        uri: foto.uri,
        name: 'foto.jpg',
        type: 'image/jpeg',
      });
    }

    formData.append('descricao', descricao);
    formData.append('status', 'perdido');
    formData.append('ultima_localizacao', ultimaLocalizacao);
    formData.append('nome_dono', nomeDono);
    formData.append('contato_dono', contatoDono);
    formData.append('usuario_id', 1); // Substitua pelo ID do usuário logado

    console.log('Dados do FormData:', formData); // Log dos dados do FormData

    try {
      console.log('Enviando requisição para o backend...'); // Log antes de enviar a requisição

      const response = await api.post('/animais', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

      <TextInput
        style={styles.input}
        placeholder="Tipo do Animal (ex: Cachorro, Gato, Papagaio)"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity style={styles.botaoFoto} onPress={pickImage}>
        <Text style={styles.textoBotaoFoto}>Selecionar Foto</Text>
      </TouchableOpacity>

      {/* Verifica se foto é válida antes de usar */}
      {foto ? (
        <Image source={{ uri: foto.uri }} style={styles.foto} />
      ) : (
        <Image source={require('../../assets/images/pets.jpeg')} style={styles.foto} />
      )}

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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  botaoFoto: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotaoFoto: {
    color: '#fff',
    fontSize: 16,
  },
  foto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
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