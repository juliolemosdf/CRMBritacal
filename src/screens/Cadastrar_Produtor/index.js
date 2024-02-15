import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { initializeApp } from 'firebase/app'; // Usado para inicializar o Firebase
import { getAuth } from 'firebase/auth'; // Usado para obter o estado de autenticação
import { getDatabase, ref, set, push, child } from 'firebase/database';
 // Usado para acessar o Realtime Database
import firebaseConfig from '../Usuario/firebaseConfig'; // Ajuste o caminho conforme a localização do seu firebaseConfig
import { useNavigation } from '@react-navigation/native'; // Certifique-se de que está importando useNavigation

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);




export default function AddProducerScreen() {
  const navigation = useNavigation();
  const [producerName, setProducerName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [productionType, setProductionType] = useState('');
  const [contact, setContact] = useState('');
  const [birthday, setBirthday] = useState(''); // Corrigido para aniversário
  const [hectares, setHectares] = useState(''); // Para quantidade de hectares
  const [hectaresCorrected, setHectaresCorrected] = useState(''); // Hectares corrigidos
  const [nearestBranch, setNearestBranch] = useState(''); // Filial mais próxima
  const [areaAbertura, setAreaAbertura] = useState(false); // Área de abertura no próximo ano
  const [ultimaCompraBritacal, setUltimaCompraBritacal] = useState(false); // Última compra com a Britacal
  const [pretendeComprar, setPretendeComprar] = useState(false); // Cliente pretende comprar esse ano
  const [nomeOutraEmpresa, setNomeOutraEmpresa] = useState(''); // Nome da outra empresa, se aplicável
  const [userUID, setUserUID] = useState('');

  // Adicione mais estados conforme necessário

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid);
    }
  }, []);

  const handleSubmit = async () => {
    if (!userUID) {
      alert('Usuário não identificado.');
      return;
    }

    const clearForm = () => {
      setProducerName('');
      setFarmName('');
      setLocation('');
      setProductionType('');
      setContact('');
      setBirthday('');
      setHectares('');
      setHectaresCorrected('');
      setNearestBranch('');
      setAreaAbertura(false);
      setUltimaCompraBritacal(false);
      setPretendeComprar(false);
      setNomeOutraEmpresa('');
      // Limpe os outros estados conforme necessário
    };

    const producerData = {
      producerName,
      farmName,
      location,
      productionType,
      contact,
      birthday,
      hectares,
      hectaresCorrected,
      nearestBranch,
      areaAbertura,
      ultimaCompraBritacal,
      pretendeComprar,
      nomeOutraEmpresa
    };
  
    const database = getDatabase(app);
    // Referência para a localização onde você deseja salvar os dados do produtor.
    const producerRef = ref(database, `/${userUID}/Produtores`);
    // Cria um novo nó sob Produtores e obtém sua chave.
    const newProducerRef = push(producerRef);
    
    try {
      // Usando set() com a referência obtida por push() para salvar os dados.
      await set(newProducerRef, producerData);
      alert('Informações salvas com sucesso!');
      clearForm(); // Limpa o formulário
      navigation.navigate('Home'); 
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar informações.");
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Produtor</Text>
        <TextInput
          style={styles.input}
          value={producerName}
          onChangeText={setProducerName}
          placeholder="Digite o nome do produtor"
        />

        <Text style={styles.label}>Nome da Fazenda</Text>
        <TextInput
          style={styles.input}
          value={farmName}
          onChangeText={setFarmName}
          placeholder="Digite o nome da fazenda"
        />

        <Text style={styles.label}>Localização</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Endereço ou coordenadas GPS"
        />

        <Text style={styles.label}>Tipo de Produção</Text>
        <TextInput
          style={styles.input}
          value={productionType}
          onChangeText={setProductionType}
          placeholder="Ex: Grãos, Frutas, Pecuária"
        />

        <Text style={styles.label}>Contato</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="Telefone ou e-mail"
        />

      <Text style={styles.label}>Dia do Aniversario</Text>
        <TextInput
          style={styles.input}
          value={birthday}
          onChangeText={setBirthday}
          placeholder="Dia do Aniversario"
        />

<Text style={styles.label}>Hectares</Text>
        <TextInput
          style={styles.input}
          value={hectares}
          onChangeText={setHectares}
          placeholder="Quantos Hectares"
        />

<Text style={styles.label}>Hectares Corrigidos</Text>
        <TextInput
          style={styles.input}
          value={hectaresCorrected}
          onChangeText={setHectaresCorrected}
          placeholder="Hectares Corrigidos"
        />

<Text style={styles.label}>Filial mais proxima</Text>
        <TextInput
          style={styles.input}
          value={nearestBranch}
          onChangeText={setNearestBranch}
          placeholder="EX: Emfol, F01, F04..."
        />
        <Text style={styles.label}>Área de abertura no próximo ano?</Text>
<View style={styles.switchContainer}>
  <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={areaAbertura ? "#208404" : "#f4f3f4"}
    onValueChange={() => setAreaAbertura(previousState => !previousState)}
    value={areaAbertura}
  />
</View>

<Text style={styles.label}>Última compra com a Britacal?</Text>
<View style={styles.switchContainer}>
  <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={ultimaCompraBritacal ? "#208404" : "#f4f3f4"}
    onValueChange={() => setUltimaCompraBritacal(previousState => !previousState)}
    value={ultimaCompraBritacal}
  />
</View>

{!ultimaCompraBritacal && ( // Se a resposta for "Não", mostra o campo adicional
  <View>
    <Text style={styles.label}>Nome da outra empresa:</Text>
    <TextInput
      style={styles.input}
      value={nomeOutraEmpresa}
      onChangeText={setNomeOutraEmpresa}
      placeholder="Digite o nome da empresa"
    />
  </View>
)}


<Text style={styles.label}>Cliente pretende comprar esse ano?</Text>
<View style={styles.switchContainer}>
  <Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={pretendeComprar ? "#208404" : "#f4f3f4"}
    onValueChange={() => setPretendeComprar(previousState => !previousState)}
    value={pretendeComprar}
  />
</View>


        <Button title="Salvar" onPress={handleSubmit} color="#208404" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  
});
