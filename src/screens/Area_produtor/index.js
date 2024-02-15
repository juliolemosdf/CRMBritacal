import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, query, orderByKey, limitToLast, onValue } from 'firebase/database';
import firebaseConfig from '../../components/firebase'; // Verifique o caminho

// Certifique-se de que o Firebase esteja inicializado
initializeApp(firebaseConfig);

export default function ProducerAreaScreen() {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const userUID = auth.currentUser?.uid;
    if (userUID) {
      const db = getDatabase();
      const producersRef = ref(db, `/${userUID}/Produtores`);
      const lastTenProducersQuery = query(producersRef, orderByKey(), limitToLast(10));

      const unsubscribe = onValue(lastTenProducersQuery, (snapshot) => {
        const producersList = [];
        snapshot.forEach((childSnapshot) => {
          producersList.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });

        setProducers(producersList.reverse());
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={producers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.producerItem}>
            <Text style={styles.producerName}>{item.producerName}</Text>
            <Text>Localização: {item.location}</Text>
            {/* Inclua mais detalhes do produtor conforme necessário */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  producerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  producerName: {
    fontWeight: 'bold',
  },
});
