import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { app, auth } from '../../components/firebase'; // Ajuste conforme necessário
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

export default function UserScreen() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [regiao, setRegiao] = useState('');
  const [avatar, setAvatar] = useState(''); // Novo estado para armazenar o URL do avatar
  const [userUID, setUserUID] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid);
    }
  }, []);

  useEffect(() => {
    if (userUID) fetchUserData();
  }, [userUID]);

  const fetchUserData = () => {
    const database = getDatabase(app);
    const userRef = ref(database, 'usuarios/' + userUID);
    
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setNome(userData.nome || '');
        setTelefone(userData.telefone || '');
        setRegiao(userData.regiao || '');
        setAvatar(userData.avatar || ''); // Atualiza o estado do avatar com o valor do banco de dados
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Você precisa permitir acesso à galeria.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      console.log("Seleção de foto foi cancelada.");
      return;
    }

    const response = await fetch(pickerResult.uri);
    const blob = await response.blob();
    const storage = getStorage(app);
    const fileRef = storageRef(storage, `avatars/${userUID}`);
    uploadBytes(fileRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setAvatar(downloadURL); // Atualiza o estado do avatar com a URL da foto carregada
      });
    }).catch((error) => {
      console.error("Erro ao fazer upload da foto:", error);
      alert("Erro ao carregar a foto.");
    });
  };

  const handleAddOrUpdateUser = () => {
    const database = getDatabase(app);
    const userRef = ref(database, 'usuarios/' + userUID);

    set(userRef, {
      nome: nome,
      telefone: telefone,
      regiao: regiao,
      avatar: avatar, // Inclui o URL do avatar no banco de dados
    }).then(() => {
      alert(`Usuário ${nome ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.navigate('Home');
    }).catch((error) => {
      console.error("Erro ao adicionar/atualizar usuário:", error);
      alert("Erro ao cadastrar/atualizar usuário.");
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Escolher Foto" onPress={handleChoosePhoto} />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        keyboardType="phone-pad"
        onChangeText={setTelefone}
        style={styles.input}
      />
      <TextInput
        placeholder="Região"
        value={regiao}
        onChangeText={setRegiao}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddOrUpdateUser} style={styles.button}>
        <Text style={styles.buttonText}>{nome ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#208404',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
