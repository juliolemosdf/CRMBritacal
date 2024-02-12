import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelloWorldScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Novo Produtor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Usa todo o espaço disponível
    justifyContent: 'center', // Centraliza o conteúdo no eixo Y (vertical)
    alignItems: 'center', // Centraliza o conteúdo no eixo X (horizontal)
    backgroundColor: '#f5f5f5', // Define a cor de fundo da tela
  },
  text: {
    fontSize: 20, // Define o tamanho da fonte
    fontWeight: 'bold', // Define o peso da fonte
  },
});

export default HelloWorldScreen;
