import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../screens/TelaInicial';
import TelaLogin from '../screens/TelaLogin';
import TelaCadastro from '../screens/TelaCadastro';
import Home from '../screens/Home';
import CadastroAnimalPerdido from '../screens/CadastroAnimalPerdido'; // Importe a tela CadastroAnimalPerdido
import RelatarAvistamento from '../screens/RelatarAvistamento.js';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="TelaInicial">
      <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{ title: 'Bem-vindo' }}
      />
      <Stack.Screen
        name="TelaLogin"
        component={TelaLogin}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="TelaCadastro"
        component={TelaCadastro}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="CadastroAnimalPerdido"
        component={CadastroAnimalPerdido}
        options={{ title: 'Cadastrar Animal Perdido' }}
      />
      <Stack.Screen
        name="RelatarAvistamento"
        component={RelatarAvistamento}
        options={{ title: 'Relatar Avistamento' }}
      />
    </Stack.Navigator>
  );
}