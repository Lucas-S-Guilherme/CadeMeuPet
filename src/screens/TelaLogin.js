import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCampos = () => {
    const novosErros = {};

    if (!validarEmail(email)) {
      novosErros.email = 'Por favor, insira um e-mail válido.';
    }

    if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // Retorna true se não houver erros
  };

  const handleLogin = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      const response = await api.post('/login', { email, senha });
      console.log('Resposta da API:', response.data); // Log da resposta

      if (response.data.success) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Redireciona para a tela inicial
      } else {
        // Verifica se o erro é de e-mail ou senha
        if (response.data.message === 'E-mail não encontrado') {
          setErros({ email: 'E-mail não cadastrado.' });
        } else if (response.data.message === 'Senha incorreta') {
          setErros({ senha: 'Senha incorreta.' });
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error); // Log do erro
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
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
      <Text style={styles.titulo}>Login</Text>

      {/* Frase motivacional */}
      <Text style={styles.fraseMotivacional}>
        Faça login e ajude a reunir pets com seus donos!
      </Text>

      {/* Campos do formulário */}
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

      {/* Botão de login */}
      <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
        <Text style={styles.textoBotaoEntrar}>Entrar</Text>
      </TouchableOpacity>

      {/* Link para cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
        <Text style={styles.linkCadastro}>Não tem uma conta? Cadastre-se</Text>
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
  botaoEntrar: {
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
  textoBotaoEntrar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkCadastro: {
    marginTop: 20,
    color: '#ff9800',
    fontSize: 16,
    fontWeight: 'bold',
  },
  erro: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default TelaLogin;