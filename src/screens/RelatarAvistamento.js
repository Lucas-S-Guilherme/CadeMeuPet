import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';

const RelatarAvistamento = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { animal } = route.params;

  const [localizacao, setLocalizacao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataAvistamento, setDataAvistamento] = useState('');

  // Função para validar e formatar a data
  const formatarData = (data) => {
    // Remove caracteres não numéricos
    const dataLimpa = data.replace(/\D/g, '');

    // Aplica a máscara de data (dia/mês/ano)
    let dataFormatada = '';
    if (dataLimpa.length > 0) {
      dataFormatada += dataLimpa.slice(0, 2); // Dia
    }
    if (dataLimpa.length > 2) {
      dataFormatada += `/${dataLimpa.slice(2, 4)}`; // Mês
    }
    if (dataLimpa.length > 4) {
      dataFormatada += `/${dataLimpa.slice(4, 8)}`; // Ano
    }

    return dataFormatada;
  };

  // Função para converter a data de PT-BR para YYYY-MM-DD
  const converterDataParaBackend = (data) => {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  };

  const handleRelatarAvistamento = async () => {
    if (!localizacao || !observacoes || !dataAvistamento) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    // Valida se a data está no formato correto
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataAvistamento)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/AAAA.');
      return;
    }

    // Converte a data para o formato YYYY-MM-DD
    const dataBackend = converterDataParaBackend(dataAvistamento);

    const dados = {
      animal_id: animal.id,
      localizacao,
      observacoes,
      data_avistamento: dataBackend,
      usuario_id: 1, // Substitua pelo ID do usuário logado
    };

    try {
      const response = await api.post('/avistamentos', dados);
      if (response.data.success) {
        Alert.alert('Sucesso', 'Avistamento registrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao registrar o avistamento.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar registrar o avistamento.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Relatar Avistamento</Text>
      <Text style={styles.subtitulo}>Animal: {animal.nome}</Text>

      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Data do Avistamento (DD/MM/AAAA)"
        value={dataAvistamento}
        onChangeText={(text) => setDataAvistamento(formatarData(text))} // Aplica a formatação
        keyboardType="numeric"
        maxLength={10} // Limita o tamanho do campo
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleRelatarAvistamento}>
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
  subtitulo: {
    fontSize: 18,
    color: '#333',
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

export default RelatarAvistamento;10