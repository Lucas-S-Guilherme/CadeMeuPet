// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../screens/TelaInicial';
import TelaLogin from '../screens/TelaLogin';
import TelaCadastro from '../screens/TelaCadastro';

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
    </Stack.Navigator>
  );
}