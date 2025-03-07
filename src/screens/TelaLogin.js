import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, senha });
      console.log('Resposta da API:', response.data); // Log da resposta

      if (response.data.success) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Redireciona para a tela inicial
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error); // Log do erro
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
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
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TelaLogin;