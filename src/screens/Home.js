import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import api from '../services/api';

const Home = () => {
  const navigation = useNavigation();
  const [animais, setAnimais] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('cachorro');
  const [foto, setFoto] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
  const [nomeDono, setNomeDono] = useState('');
  const [contatoDono, setContatoDono] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto(result.uri);
    }
  };

  const handleCadastroAnimal = async () => {
    if (!nome || !descricao || !ultimaLocalizacao || !nomeDono || !contatoDono) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
  
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('tipo', tipo);
    formData.append('foto', {
      uri: foto,
      name: 'foto.jpg',
      type: 'image/jpeg',
    });
    formData.append('descricao', descricao);
    formData.append('status', 'perdido');
    formData.append('ultima_localizacao', ultimaLocalizacao);
    formData.append('nome_dono', nomeDono);
    formData.append('contato_dono', contatoDono);
    formData.append('usuario_id', 1); // Substitua pelo ID do usuário logado
  
    console.log('Dados enviados:', formData); // Log dos dados enviados
  
    try {
      const response = await api.post('/animais', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resposta da API:', response.data); // Log da resposta
  
      if (response.data.success) {
        Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
        setMostrarFormulario(false);
        carregarAnimais();
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o animal.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error); // Log do erro completo
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o animal.');
    }
  };

  const carregarAnimais = async () => {
    try {
      const response = await api.get('/animais');
      setAnimais(response.data.animais);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    }
  };

  React.useEffect(() => {
    carregarAnimais();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesAnimal', { animal: item })}
    >
      <Image source={{ uri: item.foto }} style={styles.cardImage} />
      <Text style={styles.cardNome}>{item.nome}</Text>
      <Text style={styles.cardTipo}>{item.tipo}</Text>
      <Text style={styles.cardStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadê Meu Pet</Text>

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <Text style={styles.textoBotaoCadastrar}>
          {mostrarFormulario ? 'Cancelar' : 'Cadastrar Animal Perdido'}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Animal"
            value={nome}
            onChangeText={setNome}
          />

          <Picker
            selectedValue={tipo}
            style={styles.input}
            onValueChange={(itemValue) => setTipo(itemValue)}
          >
            <Picker.Item label="Cachorro" value="cachorro" />
            <Picker.Item label="Gato" value="gato" />
            <Picker.Item label="Papagaio" value="papagaio" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>

          <TouchableOpacity style={styles.botaoFoto} onPress={pickImage}>
            <Text style={styles.textoBotaoFoto}>Selecionar Foto</Text>
          </TouchableOpacity>

          {foto && <Image source={{ uri: foto }} style={styles.foto} />}

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

          <TouchableOpacity style={styles.botaoSalvar} onPress={handleCadastroAnimal}>
            <Text style={styles.textoBotaoSalvar}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.subtitulo}>Animais Desaparecidos</Text>

      <FlatList
        data={animais}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 20,
    textAlign: 'center',
  },
  botaoCadastrar: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotaoCadastrar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formulario: {
    marginBottom: 20,
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
  },
  botaoSalvar: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTipo: {
    fontSize: 14,
    color: '#777',
  },
  cardStatus: {
    fontSize: 14,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});

export default Home;