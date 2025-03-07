import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadê meu Pet</Text>
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('Cadastro')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
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
});

export default TelaInicial;