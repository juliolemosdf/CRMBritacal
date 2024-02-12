import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Login';
import HomeScreen from '../../screens/Home'; // Sua tela Home
import Configuracao from '../../screens/Usuario';
import AreaProdutor from '../../screens/Area_produtor';
import CadastrarProdutor from '../../screens/Cadastrar_Produtor';
import Relatorios from '../../screens/Relatorios';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isAuthenticated }) {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        // Usuário autenticado, mostrar tela Home
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
       
      ) : (
        // Usuário não autenticado, mostrar tela de Login
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
       <Stack.Screen name="Configuração" component={Configuracao} options={{ headerShown: false }} />
       <Stack.Screen name="Area Produtor" component={AreaProdutor} options={{ headerShown: false }} />
       <Stack.Screen name="Cadastrar Produtor" component={CadastrarProdutor} options={{ headerShown: false }} />
       <Stack.Screen name="Relatorios" component={Relatorios} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
