import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import { auth } from '../../components/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
    />
  );
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful.
        navigation.navigate('Home'); // Navega para a tela Home
        console.log('Logged in with:', userCredential.user.email);
        // Aqui você pode redirecionar para a tela principal do CRM
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require('../../image/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <CustomTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomTextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  textInput: {
    width: 250, // Largura ajustada para melhorar a estética
    height: 40,
    borderColor: '#208404',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  logo: {
    width: 250, // Ajuste a largura conforme necessário
    height: 100, // Altura ajustada para manter a proporção
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#208404',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 250, // Ajuste para corresponder à largura dos TextInput
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
