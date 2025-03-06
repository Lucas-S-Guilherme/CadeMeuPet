// screens/ReportScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ReportScreen() {
  const [animalType, setAnimalType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleReport = () => {
    // Aqui você pode enviar os dados para um backend ou armazenar localmente
    console.log({ animalType, location, description });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tipo do Animal"
        value={animalType}
        onChangeText={setAnimalType}
        style={styles.input}
      />
      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Button title="Reportar" onPress={handleReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});