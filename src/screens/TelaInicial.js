import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
const { width } = Dimensions.get("window");


const animaisDesaparecidos = [
  {
    id: "1",
    nome: "Bolinha",
    local: "Rua das Flores, 123",
    descricao: "Pequeno, pelagem marrom, muito dócil.",
    imagem: require("../../assets/images/bolinha.jpeg"),
  },
  {
    id: "2",
    nome: "Minha",
    local: "Praça Central",
    descricao: "Gata branca com olhos azuis. Usa coleira vermelha.",
    imagem: require("../../assets/images/minha.jpg"),
  },
  {
    id: "3",
    nome: "Thor",
    local: "Avenida Paulista",
    descricao: "Husky siberiano, olhos azuis, sumiu de casa.",
    imagem: require("../../assets/images/thor.jpg"),
  },
];



const TelaInicial = ({ navigation }) => {
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.imagemAnimal} />
      <Text style={styles.nomeAnimal}>{item.nome}</Text>
      <Text style={styles.localAnimal}>{item.local}</Text>
      <Text style={styles.descricaoAnimal}>{item.descricao}</Text>
      <TouchableOpacity style={styles.botaoAvistamento}>
        <Text style={styles.textoBotaoAvistamento}>Relatar Avistamento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/images/logocaramelo.jpeg")} style={styles.logo} />

      <Text style={styles.titulo}>Cadê Meu Pet</Text>
      <Text style={styles.subtitulo}>Encontre e proteja seus amiguinhos!</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("TelaCadastro")}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={() => navigation.navigate("TelaLogin")}>
        <Text style={[styles.textoBotao, styles.textoBotaoSecundario]}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.tituloCarrossel}>🐾 Animais Desaparecidos</Text>

      <Carousel
        data={animaisDesaparecidos}
        renderItem={({ item }) => renderItem({ item })}
        width={width * 0.8}  
        height={250} 
        loop
        autoPlay
        mode="parallax"
        modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
        }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  botao: {
    width: "80%",
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 3,
  },
  botaoSecundario: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ff9800",
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  textoBotaoSecundario: {
    color: "#ff9800",
  },
  tituloCarrossel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imagemAnimal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nomeAnimal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  localAnimal: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  descricaoAnimal: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  botaoAvistamento: {
    backgroundColor: "#2ecc71",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotaoAvistamento: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TelaInicial;
