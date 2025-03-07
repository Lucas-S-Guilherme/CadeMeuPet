import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erros, setErros] = useState({});

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarTelefone = (telefone) => {
    const regex = /^\d{10,11}$/; // Aceita telefones com 10 ou 11 dígitos
    return regex.test(telefone);
  };

  const validarCampos = () => {
    const novosErros = {};

    if (nome.length < 3) {
      novosErros.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!validarEmail(email)) {
      novosErros.email = 'Por favor, insira um e-mail válido.';
    }

    if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    if (!validarTelefone(telefone)) {
      novosErros.telefone = 'Por favor, insira um telefone válido.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // Retorna true se não houver erros
  };

  const handleCadastro = async () => {
    if (!validarCampos()) {
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
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />
        {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
      </View>

      <View style={styles.campoContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
      </View>

      <View style={styles.campoContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      </View>

      <View style={styles.campoContainer}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        {erros.confirmarSenha && <Text style={styles.erro}>{erros.confirmarSenha}</Text>}
      </View>

      <View style={styles.campoContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        {erros.telefone && <Text style={styles.erro}>{erros.telefone}</Text>}
      </View>

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
  campoContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
  erro: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default TelaCadastro;