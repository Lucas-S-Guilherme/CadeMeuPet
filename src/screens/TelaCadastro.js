import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    console.log('Dados enviados:', { nome, email, senha, telefone }); // Log dos dados enviados

    try {
      const response = await api.post('/cadastro', { nome, email, senha, telefone });
      console.log('Resposta da API:', response.data); // Log da resposta da API
      if (response.data.success) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('TelaLogin');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error); // Log do erro
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/logocaramelo.jpeg')} // Substitua pelo caminho correto da sua logo
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.titulo}>Cadastro</Text>

      {/* Frase motivacional */}
      <Text style={styles.fraseMotivacional}>
        Junte-se a nós e ajude a reunir pets com seus donos!
      </Text>

      {/* Campos do formulário */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastro}>
        <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
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
  fraseMotivacional: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
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
  botaoCadastrar: {
    width: '100%',
    backgroundColor: '#ff9800', // Tom de laranja igual ao da tela inicial
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textoBotaoCadastrar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaCadastro;