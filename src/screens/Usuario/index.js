import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getStorage, ref as firebaseRef, uploadBytes } from 'firebase/storage';

// Inicializa o Firebase
initializeApp(firebaseConfig);

export default function App() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage(); // Acessa o storage
      // Corrige o nome da variável para evitar conflitos
      const storageRef = firebaseRef(storage, `images/${new Date().getTime()}.jpg`); // Cria uma referência única para cada imagem

      // Converte a imagem para um blob
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      // Faz o upload da imagem
      await uploadBytes(storageRef, bytes)
        .then(() => {
          alert('Image uploaded successfully!');
        })
        .catch((error) => {
          alert('Upload failed:', error);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={pickImage}>
        <Text>Select Image</Text>
      </TouchableHighlight>
    </View>
  );
}
