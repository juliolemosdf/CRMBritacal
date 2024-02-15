import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { getDatabase, ref, set, get } from "firebase/database";
import { app, auth } from "../../components/firebase"; // Ajuste conforme necessário
import { useNavigation } from "@react-navigation/native"; // Importe useNavigation

export default function UserScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [regiao, setRegiao] = useState("");
  const [userUID, setUserUID] = useState("");
  const navigation = useNavigation(); // Hook de navegação

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = () => {
      const database = getDatabase(app);
      const userRef = ref(database, "usuarios/" + userUID);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setNome(userData.nome || "");
            setTelefone(userData.telefone || "");
            setRegiao(userData.regiao || "");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (userUID) fetchUserData();
  }, [userUID]);

  const handleAddOrUpdateUser = () => {
    const database = getDatabase(app);
    const userRef = ref(database, "usuarios/" + userUID);

    set(userRef, {
      nome: nome,
      telefone: telefone,
      regiao: regiao,
    })
      .then(() => {
        alert(`Usuário ${nome ? "atualizado" : "cadastrado"} com sucesso!`);
        navigation.navigate("Home"); // Navegar para a tela Home após cadastro/atualização
      })
      .catch((error) => {
        console.error("Erro ao adicionar/atualizar usuário:", error);
        alert("Erro ao cadastrar/atualizar usuário.");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../image/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
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
        <Text style={styles.buttonText}>
          {nome ? "Atualizar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#208404",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 250, // Ajuste a largura conforme necessário
    height: 100, // Altura ajustada para manter a proporção
    marginBottom: 20,
  },
});
