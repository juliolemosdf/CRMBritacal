import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { auth } from '../../components/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userUID, setUserUID] = useState('');

  useEffect(() => {
    // Verifica se existe um usuário autenticado e obtém o UID
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid); // Define o UID do usuário autenticado
    }
  }, []);
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout bem-sucedido, redirecione para a tela de Login
        navigation.navigate('Login');
      })
      .catch((error) => {
        // Um erro ocorreu
        console.error('Logout error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
              source={require('../../image/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastrar Produtor')}>
        <Text style={styles.buttonText}>Cadastrar Produtor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Area Produtor')}>
        <Text style={styles.buttonText}>Área do Produtor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Relatórios')}>
        <Text style={styles.buttonText}>Relatórios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configuração')}>
        <Text style={styles.buttonText}>Configuração</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250, // Ajuste a largura conforme necessário
    height: 100, // Altura ajustada para manter a proporção
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#208404', // Cor padrão do aplicativo
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Bordas mais arredondadas
    marginBottom: 10, // Espaçamento entre os botões
    width: '60%', // Largura ajustada para os botões
    alignItems: 'center', // Centraliza o texto no botão
  },
  buttonText: {
    color: 'white', // Texto branco para contraste
    fontSize: 16, // Tamanho do texto
  },
});
