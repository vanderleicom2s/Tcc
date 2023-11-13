import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { ref, get, getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC-sTNLSRresl1l8dEdHUap3MDnMa8olWg",
  authDomain: "tcc-01-14792.firebaseapp.com",
  databaseURL: "https://tcc-01-14792-default-rtdb.firebaseio.com",
  projectId: "tcc-01-14792",
  storageBucket: "tcc-01-14792.appspot.com",
  messagingSenderId: "432967975257",
  appId: "1:432967975257:web:890f1cf2373a70fa5d8c48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Chamar = () => {
  const [inputFolder, setInputFolder] = useState('');
  const [inputId, setInputId] = useState('');
  const [data, setData] = useState([]);

  const handleChamarData = async () => {
    if (inputFolder && inputId) {
      try {
        // Conectar ao Realtime Database
        const db = getDatabase();

        // Criar uma referência para a pasta e ID especificados
        const dataRef = ref(db, `${inputFolder}/${inputId}`);
        
        // Buscar as informações associadas ao ID
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
          setData([snapshot.val()]);
        } else {
          setData([]);
          console.log('Nenhum dado encontrado para o ID especificado.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Informações</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da pasta (ex: nomes)"
        value={inputFolder}
        onChangeText={setInputFolder}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o ID"
        value={inputId}
        onChangeText={setInputId}
      />
      <Button title="Buscar" onPress={handleChamarData} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.Name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default Chamar;
