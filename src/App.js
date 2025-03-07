import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

async function loadFonts() {
  await Font.loadAsync({
    ...Ionicons.font,
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Ou um componente de loading
  }
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! - teste</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
